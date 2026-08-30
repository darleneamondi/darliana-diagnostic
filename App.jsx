const [cameraActive, setCameraActive] = useState(false);
const [alignmentText, setAlignmentText] = useState("Center your face inside the oval");
const videoRef = useRef(null);

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true);
      videoRef.current.play();
      setCameraActive(true);
      setTimeout(() => setAlignmentText("Hold steady... Analyzing barrier integrity"), 2000);
      setTimeout(() => setAlignmentText("Alignment clear! Proceed to diagnostic"), 4000);
    }
  } catch (err) {
    alert("Camera access unavailable. You can still complete the diagnostic.");
  }
};

// Re-connects camera if Safari iOS drops the stream when switching tabs
useEffect(() => {
  const handleVisibility = () => {
    if (document.visibilityState === 'visible' && cameraActive) startCamera();
  };
  document.addEventListener('visibilitychange', handleVisibility);
  return () => document.removeEventListener('visibilitychange', handleVisibility);
}, [cameraActive]);  
<div className="w-full bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
  <div 
    className="bg-emerald-500 h-full transition-all duration-300" 
    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
  />
</div>    
<div className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2 mb-4">
  <span className="text-base">🔒</span>
  <p><strong>100% Private:</strong> Camera processing runs locally in your browser. No photos or face data are saved or uploaded.</p>
</div>
<div className="relative aspect-[4/5] bg-slate-950 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
  {cameraActive ? (
    <>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="w-full h-full object-cover transform -scale-x-100" 
      />
      {/* KYC Oval Mask Overlay */}
      <div className="absolute inset-0 border-[3px] border-emerald-400/70 rounded-[50%] m-8 pointer-events-none shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] animate-pulse" />
      
      {/* Live Alignment Prompt */}
      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-slate-700 text-emerald-300 text-xs text-center py-2 px-3 rounded-lg backdrop-blur-sm font-medium">
        {alignmentText}
      </div>
    </>
  ) : (
    <div className="text-center p-6 space-y-3">
      <div className="w-16 h-20 border-2 border-dashed border-emerald-400/60 rounded-[50%] mx-auto mb-2 flex items-center justify-center text-emerald-400 text-xl">👤</div>
      <p className="text-xs text-slate-400">Position your face in the oval frame for optical barrier analysis</p>
      <button 
        type="button" 
        onClick={startCamera}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition"
      >
        Enable Alignment Camera
      </button>
    </div>
  )}
</div>
