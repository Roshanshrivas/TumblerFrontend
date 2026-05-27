import React, { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { tumblers } from "../utils/tumblerData";
import toast from "react-hot-toast";

const TumblerCustomizer = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [selectedTumbler, setSelectedTumbler] = useState(tumblers[0]);
  const [userText, setUserText] = useState("");
  const [selectedFont, setSelectedFont] = useState(tumblers[0].theme.defaultFont);
  const [selectedColor, setSelectedColor] = useState(tumblers[0].theme.defaultColor);
  const [fontSize, setFontSize] = useState(34);
  const [fontWeight, setFontWeight] = useState("700");
  const [fontStyle, setFontStyle] = useState("normal");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save canvas state for undo/redo
  const saveState = useCallback(() => {
    if (!fabricCanvas.current) return;
    const json = JSON.stringify(fabricCanvas.current.toJSON());
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(json);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      fabricCanvas.current.loadFromJSON(JSON.parse(history[newIndex]), () => {
        fabricCanvas.current.renderAll();
      });
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      fabricCanvas.current.loadFromJSON(JSON.parse(history[newIndex]), () => {
        fabricCanvas.current.renderAll();
      });
    }
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 500,
      height: 700,
      preserveObjectStacking: true,
    });
    fabricCanvas.current = canvas;

    saveState();
    canvas.on("object:modified", () => saveState());
    canvas.on("object:added", () => saveState());
    canvas.on("object:removed", () => saveState());

    return () => canvas.dispose();
  }, []);

  // Load tumbler background
  useEffect(() => {
    if (!fabricCanvas.current) return;
    loadTumbler();
  }, [selectedTumbler]);

  const loadTumbler = () => {
    const canvas = fabricCanvas.current;
    canvas.clear();

    fabric.Image.fromURL(selectedTumbler.image, (img) => {
      img.scaleToWidth(500);
      img.selectable = false;
      img.evented = false;
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      addGuideArea();
      saveState();
    });
  };

  const addGuideArea = () => {
    const canvas = fabricCanvas.current;
    const area = selectedTumbler.textArea;
    const guide = new fabric.Rect({
      left: area.left,
      top: area.top,
      width: area.width,
      height: area.height,
      fill: "transparent",
      stroke: "#ccc",
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });
    canvas.add(guide);
  };

  // Constrain object inside area (handles rotation)
  const constrainToArea = (obj, area) => {
    const boundingRect = obj.getBoundingRect();
    let left = boundingRect.left;
    let top = boundingRect.top;
    const right = boundingRect.left + boundingRect.width;
    const bottom = boundingRect.top + boundingRect.height;

    let deltaX = 0, deltaY = 0;
    if (left < area.left) deltaX = area.left - left;
    if (right > area.left + area.width) deltaX = (area.left + area.width) - right;
    if (top < area.top) deltaY = area.top - top;
    if (bottom > area.top + area.height) deltaY = (area.top + area.height) - bottom;

    if (deltaX !== 0 || deltaY !== 0) {
      obj.left += deltaX;
      obj.top += deltaY;
      obj.setCoords();
    }
  };

  const addText = (initialText) => {
    const canvas = fabricCanvas.current;
    const area = selectedTumbler.textArea;
    const textToAdd = initialText || userText || "Your Text";
    const textbox = new fabric.Textbox(textToAdd, {
      left: area.left + 20,
      top: area.top + 40,
      width: area.width - 40,
      fontSize: fontSize,
      fill: selectedColor,
      fontFamily: selectedFont,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: "center",
      editable: true,
      transparentCorners: false,
      cornerColor: selectedTumbler.theme.accent,
      borderColor: selectedTumbler.theme.accent,
      cornerStyle: "circle",
      padding: 10,
      hasRotatingPoint: true,
    });

    textbox.on("moving", () => constrainToArea(textbox, area));
    textbox.on("modified", () => constrainToArea(textbox, area));
    textbox.on("scaling", () => constrainToArea(textbox, area));
    textbox.on("scaling", () => {
      const { width, height, scaleX, scaleY } = textbox;
      const newWidth = width * scaleX;
      const newHeight = height * scaleY;
      if (newWidth > area.width) textbox.scaleX = area.width / width;
      if (newHeight > area.height) textbox.scaleY = area.height / height;
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
    saveState();
    return textbox;
  };

  const deleteSelectedObject = () => {
    const canvas = fabricCanvas.current;
    const active = canvas.getActiveObject();
    if (!active) return;
    canvas.remove(active);
    canvas.renderAll();
    saveState();
  };

  // Update active text object
  const updateActiveText = (props) => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active && active instanceof fabric.Textbox) {
      active.set(props);
      canvas.renderAll();
      saveState();
    } else {
      const textObjects = canvas.getObjects().filter(obj => obj instanceof fabric.Textbox);
      if (textObjects.length > 0) {
        textObjects[0].set(props);
        canvas.renderAll();
        saveState();
      }
    }
  };

  useEffect(() => {
    if (userText) updateActiveText({ text: userText });
  }, [userText]);

  useEffect(() => {
    updateActiveText({ fontFamily: selectedFont });
  }, [selectedFont]);

  useEffect(() => {
    updateActiveText({ fill: selectedColor });
  }, [selectedColor]);

  useEffect(() => {
    updateActiveText({ fontSize: fontSize });
  }, [fontSize]);

  useEffect(() => {
    updateActiveText({ fontWeight: fontWeight });
  }, [fontWeight]);

  useEffect(() => {
    updateActiveText({ fontStyle: fontStyle });
  }, [fontStyle]);

  const addNewText = () => {
    const textToAdd = userText.trim() ? userText : "Your Text";
    addText(textToAdd);
  };

  const uploadLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        const area = selectedTumbler.logoArea;
        let scale = 1;
        if (img.width > area.width) scale = area.width / img.width;
        if (img.height * scale > area.height) scale = area.height / img.height;
        img.scale(scale);
        img.set({
          left: area.left + (area.width - img.width * scale) / 2,
          top: area.top + (area.height - img.height * scale) / 2,
          cornerColor: selectedTumbler.theme.accent,
          borderColor: selectedTumbler.theme.accent,
          hasRotatingPoint: true,
        });
        fabricCanvas.current.add(img);
        fabricCanvas.current.setActiveObject(img);
        fabricCanvas.current.renderAll();
        saveState();
      });
    };
    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    const dataURL = fabricCanvas.current.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.download = "custom-tumbler.png";
    link.href = dataURL;
    link.click();
  };

  // 🛒 ADD TO CART FUNCTION (frontend only for now)
  const addToCart = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    // Capture design as PNG (dataURL)
    const designImage = canvas.toDataURL({ format: "png", quality: 1 });

    // Collect customization details
    const customization = {
      tumblerId: selectedTumbler.id,
      tumblerName: selectedTumbler.name,
      text: userText,
      font: selectedFont,
      textColor: selectedColor,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      // Optional: if you store logo, add its dataURL here
    };

    // Build cart item
    const cartItem = {
      id: Date.now(),
      product: selectedTumbler.name,
      price: 1299, // adjust as needed
      customization: customization,
      designImage: designImage, // base64 – not ideal for large carts, but works for now
      quantity: 1,
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("tumblerCart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("tumblerCart", JSON.stringify(existingCart));

    // Show success message
    toast.success("Added to cart! 🎉", {
      duration: 3000,
      position: "top-center",
      style: { background: "#ff6b00", color: "#fff" },
    });

    console.log("Cart item saved:", cartItem);

    // 🔁 Later, replace localStorage with API call:
    // fetch("/api/cart/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(cartItem),
    // });
  };

  return (
    <div className="min-h-screen bg-[#f4f1ed] flex flex-col lg:flex-row gap-4 p-4 md:p-6">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-96 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl overflow-y-auto max-h-[70vh] lg:max-h-[90vh]">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Tumbler Customizer</h2>

        {/* Tumbler Selection */}
        <div className="mb-6 md:mb-8">
          <label className="font-semibold block mb-2 md:mb-3">Choose Tumbler</label>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {tumblers.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedTumbler(item);
                  setSelectedFont(item.theme.defaultFont);
                  setSelectedColor(item.theme.defaultColor);
                }}
                className={`rounded-xl border p-1 md:p-2 transition ${
                  selectedTumbler.id === item.id
                    ? "border-black shadow-md scale-105"
                    : "border-gray-200"
                }`}
              >
                <img src={item.image} alt={item.name} className="h-16 md:h-20 object-contain mx-auto" />
                <p className="mt-1 text-xs font-medium">{item.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold block mb-1 md:mb-2">Your Text</label>
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            className="w-full border rounded-xl p-2 md:p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm md:text-base"
            placeholder="Enter name or quote"
          />
        </div>

        {/* Font Family */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold block mb-1 md:mb-2">Font Family</label>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="w-full border rounded-xl p-2 md:p-3 focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
            style={{ fontFamily: selectedFont }}
          >
            {selectedTumbler.fonts.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Slider */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold block mb-1 md:mb-2">Font Size: {fontSize}px</label>
          <input
            type="range"
            min="20"
            max="80"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Font Weight & Style */}
        <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6">
          <div>
            <label className="font-semibold block mb-1 md:mb-2">Weight</label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="w-full border rounded-xl p-2 md:p-3 text-sm md:text-base"
            >
              <option value="normal">Normal</option>
              <option value="500">Medium</option>
              <option value="600">SemiBold</option>
              <option value="700">Bold</option>
              <option value="800">ExtraBold</option>
            </select>
          </div>
          <div>
            <label className="font-semibold block mb-1 md:mb-2">Style</label>
            <select
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
              className="w-full border rounded-xl p-2 md:p-3 text-sm md:text-base"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
          </div>
        </div>

        {/* Text Color */}
        <div className="mb-6 md:mb-8">
          <label className="font-semibold block mb-2 md:mb-3">Text Color</label>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            {selectedTumbler.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${
                  selectedColor === color ? "border-black scale-110" : "border-white"
                } transition`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
          <button onClick={addNewText} className="flex-1 bg-black text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-gray-800">
            + Add Text
          </button>
          <button onClick={deleteSelectedObject} className="flex-1 bg-red-500 text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-red-600">
            Delete
          </button>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
          <button onClick={undo} className="flex-1 border border-gray-300 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-gray-100">
            Undo
          </button>
          <button onClick={redo} className="flex-1 border border-gray-300 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-gray-100">
            Redo
          </button>
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <label className="bg-orange-500 text-white py-2 md:py-3 rounded-xl text-center font-semibold cursor-pointer hover:bg-orange-600 text-sm md:text-base">
            Upload Logo / Image
            <input hidden type="file" accept="image/*" onChange={uploadLogo} />
          </label>
          <button onClick={downloadImage} className="bg-green-600 text-white py-2 md:py-3 rounded-xl font-semibold hover:bg-green-700 text-sm md:text-base">
            💾 Download as PNG
          </button>
          <button onClick={addToCart} className="bg-[#ff6b00] text-white py-2 md:py-3 rounded-xl font-semibold hover:bg-orange-600 text-sm md:text-base">
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - Canvas */}
      <div className="flex-1 flex justify-center items-center p-2 md:p-0">
        <canvas
          id="canvas"
          ref={canvasRef}
          className="rounded-2xl md:rounded-3xl shadow-2xl max-w-full h-auto border border-gray-200"
          style={{ maxHeight: "80vh", width: "auto" }}
        />
      </div>
    </div>
  );
};

export default TumblerCustomizer;