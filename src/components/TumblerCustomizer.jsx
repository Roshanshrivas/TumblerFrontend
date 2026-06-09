// TumblerCustomizer.jsx – Full‑screen Canva‑style layout
import React, { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { tumblers } from "../utils/tumblerData";
import toast from "react-hot-toast";
import {
  FiGrid, FiType, FiDroplet, FiUpload, FiDownload,
  FiShoppingCart, FiTrash2, FiPlus, FiChevronDown, FiChevronUp, FiSave,
  FiHeart, FiStar, FiSun, FiMoon, FiXCircle, FiMenu, FiX
} from "react-icons/fi";
import { CiUndo, CiRedo } from "react-icons/ci";

// ---------- Built‑in patterns (unchanged) ----------
const createPattern = (type, color = "#ff6b00") => {
  const canvas = document.createElement("canvas");
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  switch (type) {
    case "dots":
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(20, 20, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(40, 40, 4, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case "stripes":
      ctx.fillStyle = color;
      for (let i = 0; i < 40; i += 8) {
        ctx.fillRect(i, 0, 3, 40);
      }
      break;
    case "chevron":
      ctx.fillStyle = color;
      for (let i = 0; i < 40; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 6, 20);
        ctx.lineTo(i, 40);
        ctx.fill();
      }
      break;
    case "floral":
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(20, 20, 6, 0, 2 * Math.PI);
      ctx.fill();
      for (let a = 0; a < 4; a++) {
        ctx.beginPath();
        ctx.ellipse(20 + 12 * Math.cos(a * Math.PI / 2), 20 + 12 * Math.sin(a * Math.PI / 2), 4, 8, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
      break;
    default:
      return null;
  }
  return new fabric.Pattern({ source: canvas, repeat: "repeat" });
};

const readyDesigns = [
  { id: 1, name: "Dots", icon: <FiHeart />, patternType: "dots" },
  { id: 2, name: "Stripes", icon: <FiStar />, patternType: "stripes" },
  { id: 3, name: "Chevron", icon: <FiSun />, patternType: "chevron" },
  { id: 4, name: "Floral", icon: <FiMoon />, patternType: "floral" },
];

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
  const [openSections, setOpenSections] = useState({
    tumbler: true,
    text: true,
    color: true,
    designs: true,
    actions: true,
  });
  const [activeDesignObject, setActiveDesignObject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile

  // ---------- Undo / Redo (unchanged) ----------
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
      toast.success("Undo");
    } else toast.error("Nothing to undo");
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      fabricCanvas.current.loadFromJSON(JSON.parse(history[newIndex]), () => {
        fabricCanvas.current.renderAll();
      });
      toast.success("Redo");
    } else toast.error("Nothing to redo");
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
      canvas.setBackgroundImage(img, () => {
        canvas.renderAll();
        addGuideArea();
        saveState();
      });
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

  const constrainToArea = (obj, area) => {
    const boundingRect = obj.getBoundingRect();
    let left = boundingRect.left, top = boundingRect.top;
    const right = boundingRect.left + boundingRect.width;
    const bottom = boundingRect.top + boundingRect.height;
    let deltaX = 0, deltaY = 0;
    if (left < area.left) deltaX = area.left - left;
    if (right > area.left + area.width) deltaX = area.left + area.width - right;
    if (top < area.top) deltaY = area.top - top;
    if (bottom > area.top + area.height) deltaY = area.top + area.height - bottom;
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
      cornerColor: selectedTumbler.theme.accent,
      borderColor: selectedTumbler.theme.accent,
      cornerStyle: "circle",
      padding: 10,
      hasRotatingPoint: true,
    });
    textbox.on("moving", () => constrainToArea(textbox, area));
    textbox.on("modified", () => constrainToArea(textbox, area));
    textbox.on("scaling", () => constrainToArea(textbox, area));
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
    saveState();
    return textbox;
  };

  const deleteSelectedObject = () => {
    const active = fabricCanvas.current.getActiveObject();
    if (!active) {
      toast.error("No object selected");
      return;
    }
    fabricCanvas.current.remove(active);
    fabricCanvas.current.renderAll();
    saveState();
    toast.success("Deleted");
  };

  const updateActiveText = (props) => {
    const active = fabricCanvas.current.getActiveObject();
    if (active && active instanceof fabric.Textbox) {
      active.set(props);
      fabricCanvas.current.renderAll();
      saveState();
    } else {
      const textObjects = fabricCanvas.current.getObjects().filter(obj => obj instanceof fabric.Textbox);
      if (textObjects.length > 0) {
        textObjects[0].set(props);
        fabricCanvas.current.renderAll();
        saveState();
      }
    }
  };

  useEffect(() => {
    if (userText) updateActiveText({ text: userText });
  }, [userText]);
  useEffect(() => updateActiveText({ fontFamily: selectedFont }), [selectedFont]);
  useEffect(() => updateActiveText({ fill: selectedColor }), [selectedColor]);
  useEffect(() => updateActiveText({ fontSize }), [fontSize]);
  useEffect(() => updateActiveText({ fontWeight }), [fontWeight]);
  useEffect(() => updateActiveText({ fontStyle }), [fontStyle]);

  const addNewText = () => {
    const textToAdd = userText.trim() ? userText : "Your Text";
    addText(textToAdd);
    toast.success("Text added");
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
        toast.success("Logo added");
      });
    };
    reader.readAsDataURL(file);
  };

  const applyDesign = (patternType) => {
    if (activeDesignObject) fabricCanvas.current.remove(activeDesignObject);
    const area = selectedTumbler.logoArea;
    const pattern = createPattern(patternType, selectedColor === "#ffffff" ? "#ff6b00" : selectedColor);
    if (!pattern) return;
    const designRect = new fabric.Rect({
      left: area.left,
      top: area.top,
      width: area.width,
      height: area.height,
      fill: pattern,
      selectable: true,
      hasRotatingPoint: true,
      cornerColor: selectedTumbler.theme.accent,
    });
    fabricCanvas.current.add(designRect);
    fabricCanvas.current.setActiveObject(designRect);
    fabricCanvas.current.renderAll();
    setActiveDesignObject(designRect);
    saveState();
    toast.success(`Applied ${patternType} pattern`);
  };

  const clearDesign = () => {
    if (activeDesignObject) {
      fabricCanvas.current.remove(activeDesignObject);
      fabricCanvas.current.renderAll();
      setActiveDesignObject(null);
      saveState();
      toast.success("Design cleared");
    } else {
      toast.error("No design to clear");
    }
  };

  const downloadImage = () => {
    const dataURL = fabricCanvas.current.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.download = "custom-tumbler.png";
    link.href = dataURL;
    link.click();
    toast.success("Download started");
  };

  const addToCart = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
    const designImage = canvas.toDataURL({ format: "png", quality: 1 });
    const customization = {
      tumblerId: selectedTumbler.id,
      tumblerName: selectedTumbler.name,
      text: userText,
      font: selectedFont,
      textColor: selectedColor,
      fontSize,
      fontWeight,
      fontStyle,
      hasDesign: !!activeDesignObject,
    };
    const cartItem = {
      id: Date.now(),
      product: selectedTumbler.name,
      price: 1299,
      customization,
      designImage,
      quantity: 1,
    };
    const existingCart = JSON.parse(localStorage.getItem("tumblerCart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("tumblerCart", JSON.stringify(existingCart));
    toast.success("Added to cart! 🎉", { style: { background: "#ff6b00", color: "#fff" } });
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionHeader = ({ title, icon, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-800 border-b border-gray-100 hover:text-orange-500 transition"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      {openSections[section] ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* Top Bar (visible on all screens) */}
      <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-gray-700 hover:text-orange-500 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Tumbler<span className="text-orange-500">Studio</span></h1>
        </div>
        <div className="text-sm text-gray-500 hidden sm:block">Design your own tumbler – drag, resize, rotate</div>
        <div className="w-10" /> {/* spacer for alignment */}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar – fixed width, scrollable, canva‑style */}
        <aside
          className={`
            fixed lg:static top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          `}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-xl font-bold">Tools</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500"><FiX size={24} /></button>
            </div>

            {/* Tumbler Selection */}
            <div>
              <SectionHeader title="Choose Tumbler" icon={<FiGrid size={18} />} section="tumbler" />
              {openSections.tumbler && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {tumblers.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedTumbler(item);
                        setSelectedFont(item.theme.defaultFont);
                        setSelectedColor(item.theme.defaultColor);
                      }}
                      className={`rounded-xl border p-2 transition ${
                        selectedTumbler.id === item.id
                          ? "border-orange-500 shadow-md bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img src={item.image} alt={item.name} className="h-12 object-contain mx-auto" />
                      <p className="mt-1 text-xs font-medium">{item.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Text Settings */}
            <div className="mt-4">
              <SectionHeader title="Text Settings" icon={<FiType size={18} />} section="text" />
              {openSections.text && (
                <div className="space-y-3 mt-3">
                  <input type="text" value={userText} onChange={(e) => setUserText(e.target.value)} className="w-full border rounded-xl p-2 text-sm" placeholder="Your text" />
                  <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)} className="w-full border rounded-xl p-2 text-sm">
                    {selectedTumbler.fonts.map(font => <option key={font}>{font}</option>)}
                  </select>
                  <div>
                    <label className="text-xs">Size: {fontSize}px</label>
                    <input type="range" min="20" max="80" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} className="border rounded-xl p-2 text-sm">
                      <option>Normal</option><option>500</option><option>700</option>
                    </select>
                    <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className="border rounded-xl p-2 text-sm">
                      <option>Normal</option><option>Italic</option>
                    </select>
                  </div>
                  <button onClick={addNewText} className="w-full bg-black text-white py-2 rounded-xl flex items-center justify-center gap-1 text-sm"><FiPlus /> Add Text</button>
                </div>
              )}
            </div>

            {/* Color & Logo */}
            <div className="mt-4">
              <SectionHeader title="Color & Logo" icon={<FiDroplet size={18} />} section="color" />
              {openSections.color && (
                <div className="space-y-3 mt-3">
                  <div className="flex gap-2 flex-wrap">
                    {selectedTumbler.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-black scale-110" : "border-white"} shadow`} style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <label className="bg-orange-500 text-white py-2 rounded-xl text-center text-sm cursor-pointer flex items-center justify-center gap-1"><FiUpload /> Upload Logo<input hidden type="file" accept="image/*" onChange={uploadLogo} /></label>
                </div>
              )}
            </div>

            {/* Ready Designs (patterns) */}
            <div className="mt-4">
              <SectionHeader title="Ready Designs" icon={<FiStar size={18} />} section="designs" />
              {openSections.designs && (
                <>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {readyDesigns.map(design => (
                      <button key={design.id} onClick={() => applyDesign(design.patternType)} className="flex flex-col items-center p-2 border rounded-xl hover:border-orange-500">
                        <div className="text-2xl text-orange-500">{design.icon}</div>
                        <span className="text-xs">{design.name}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={clearDesign} className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded-xl flex items-center justify-center gap-1 text-sm"><FiXCircle /> Clear Design</button>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4">
              <SectionHeader title="Actions" icon={<FiTrash2 size={18} />} section="actions" />
              {openSections.actions && (
                <div className="space-y-2 mt-3">
                  <div className="flex gap-2">
                    <button onClick={undo} className="flex-1 border py-2 rounded-xl flex items-center justify-center gap-1"><CiUndo /> Undo</button>
                    <button onClick={redo} className="flex-1 border py-2 rounded-xl flex items-center justify-center gap-1"><CiRedo /> Redo</button>
                  </div>
                  <button onClick={deleteSelectedObject} className="w-full bg-red-500 text-white py-2 rounded-xl flex items-center justify-center gap-1"><FiTrash2 /> Delete</button>
                </div>
              )}
            </div>

            {/* Final actions */}
            <div className="mt-6 pt-4 border-t space-y-2">
              <button onClick={downloadImage} className="w-full bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-1"><FiDownload /> Download PNG</button>
              <button onClick={addToCart} className="w-full bg-[#ff6b00] text-white py-2 rounded-xl flex items-center justify-center gap-1"><FiShoppingCart /> Add to Cart</button>
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
          <div className="relative bg-white shadow-2xl rounded-2xl p-2 inline-block">
            <canvas
              id="canvas"
              ref={canvasRef}
              className="rounded-xl shadow-inner max-w-full h-auto"
              style={{ maxHeight: "80vh", width: "auto" }}
            />
          </div>
          {/* Optional: summary card below canvas */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-3 max-w-md w-full">
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="font-semibold">Design summary:</span> {selectedTumbler.name} | {userText || "No text"} | {selectedFont}
              </div>
              <div className="text-orange-600 font-bold">₹1,299</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TumblerCustomizer;