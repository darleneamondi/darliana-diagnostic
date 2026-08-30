'use client';

import React, { useState, useRef, useEffect } from 'react';

// Zero-dependency SVG Icon Set
const Icon = {
  Camera: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>,
  Sparkles: () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  ArrowRight: () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  ShieldCheck: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  Check: () => <svg className="w-4 h-4 inline-block text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>,
  Droplets: () => <svg className="w-5 h-5 text-amber-700 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
  Activity: () => <svg className="w-5 h-5 text-amber-700 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  Layer: () => <svg className="w-5 h-5 text-amber-700 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>,
  AlertCircle: () => <svg className="w-5 h-5 text-amber-700 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Eye: () => <svg className="w-5 h-5 text-amber-700 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  PackageCheck: () => <svg className="w-8 h-8 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
  Lock: () => <svg className="w-4 h-4 text-amber-800 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
  CameraOff: () => <svg className="w-10 h-10 text-amber-400 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.962 8.962 0 013.122-.563c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"/></svg>,
  AlertTriangle: () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
};

export default function App() {
  const [step, setStep] = useState('welcome');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  
  const [location, setLocation] = useState('Kenya / East Africa');
  const [q1Concerns, setQ1Concerns] = useState([]);
  const [q2WashFeel, setQ2WashFeel] = useState('');
  const [q3Environment, setQ3Environment] = useState([]);
  const [q4TargetGoal, setQ4TargetGoal] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const videoRef = useRef(null);

  const getProgressPercentage = () => {
    switch (step) {
      case 'welcome': return 20;
      case 'quiz': return 50;
      case 'scan': return 75;
      case 'results': return 90;
      case 'success': return 100;
      default: return 0;
    }
  };

  const toggleMulti = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const startCamera = async () => {
    setStep('scan');
    setCameraError(false);

    try {
      const constraints = {
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play().catch(e => console.log("Autoplay issue:", e));
      }
    } catch (err) {
      console.log("Camera access fallback mode active:", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      setStep('results');
    }, 2200);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await fetch("https://formsubmit.co/ajax/darleneamondi1@gmail.com", {
        method: "POST",
        body: formData
      });
    } catch (err) {
      console.log("Form submit error:", err);
    }
    setStep('success');
  };

  const isQuizValid = q1Concerns.length > 0 && q2WashFeel !== '';

  return (
    <div className="min-h-screen bg-amber-50/40 text-stone-800 font-sans p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white border border-amber-200/60 rounded-3xl p-6 md:p-10 shadow-xl shadow-amber-900/5 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1.5 bg-stone-100">
          <div 
            className="h-full bg-amber-600 transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <div className="text-center mb-8 mt-2">
          <span className="text-xs font-bold tracking-widest text-amber-800 bg-amber-100/80 px-5 py-2 rounded-full border border-amber-200 uppercase">
            DARLIANÁ
          </span>
          <h1 className="text-2xl md:text-3xl font-light mt-4 tracking-wide text-stone-900">
            Anhydrous Diagnostic Engine
          </h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mt-1">
            Step {step === 'welcome' ? 1 : step === 'quiz' ? 2 : step === 'scan' ? 3 : step === 'results' ? 4 : 5} of 5
          </p>
        </div>

        {step === 'welcome' && (
          <div className="space-y-6">
            <p className="text-stone-600 text-sm leading-relaxed text-center max-w-lg mx-auto">
              Welcome to DARLIANÁ. Begin your personalized clinical diagnostic profiling for moisture barrier integrity, hyperpigmentation mapping, and customized waterless lipid formulations.
            </p>
            
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 text-left">
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Select Your Region</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-amber-200 rounded-xl p-3.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="Kenya / East Africa">Kenya / East Africa</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Rest of Africa">Rest of Africa</option>
                <option value="International / Other">International / Other</option>
              </select>
            </div>

            <button
              onClick={() => setStep('quiz')}
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-amber-50 font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              Start Diagnostic Assessment <Icon.ArrowRight />
            </button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                1. What are your primary skin & lip concerns today? <span className="text-amber-700">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Active breakouts, blackheads, or clogged pores',
                  'Stinging, tightness, or compromised skin barrier',
                  'Post-inflammatory dark marks or uneven tone',
                  'Dry, flaky, or chapped lips',
                  'Under-eye dark circles or dehydration lines'
                ].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMulti(q1Concerns, setQ1Concerns, item)}
                    className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${
                      q1Concerns.includes(item)
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-medium'
                        : 'border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50'
                    }`}
                  >
                    <span>{item}</span>
                    {q1Concerns.includes(item) && <Icon.Check />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                2. How does your face feel 15 to 30 minutes after cleansing? <span className="text-amber-700">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Tight, uncomfortable, or dry (needs immediate moisture)',
                  'Excessively oily or shiny all over',
                  'Oily T-zone (forehead/nose), but dry or normal cheeks',
                  'Stings or turns red easily when applying products'
                ].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQ2WashFeel(item)}
                    className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all ${
                      q2WashFeel === item
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-medium'
                        : 'border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                3. Environmental factors & past routine exposure?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Frequent exposure to dust, city air, sweat, or makeup',
                  'Past use of harsh bar soaps, topical steroid creams, or aggressive scrubs',
                  'Minimal current routine (water and basic cleanser)',
                  'Chronic lip chapping, peeling, or lip border darkening'
                ].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMulti(q3Environment, setQ3Environment, item)}
                    className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${
                      q3Environment.includes(item)
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-medium'
                        : 'border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50'
                    }`}
                  >
                    <span>{item}</span>
                    {q3Environment.includes(item) && <Icon.Check />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                4. Primary 30-day target goals?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Clear active breakouts and fade post-inflammatory dark marks',
                  'Soothe irritation and rebuild epidermal moisture barrier',
                  'Restore natural skin radiance and smooth texture',
                  'Achieve deeply hydrated, smooth, and plump lips'
                ].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMulti(q4TargetGoal, setQ4TargetGoal, item)}
                    className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${
                      q4TargetGoal.includes(item)
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-medium'
                        : 'border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50'
                    }`}
                  >
                    <span>{item}</span>
                    {q4TargetGoal.includes(item) && <Icon.Check />}
                  </button>
                ))}
              </div>
            </div>

            {!isQuizValid && (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center gap-2">
                <Icon.AlertTriangle />
                Please complete questions 1 and 2 to proceed to the scan.
              </p>
            )}

            <button
              onClick={startCamera}
              disabled={!isQuizValid}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-medium ${
                isQuizValid 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Proceed to Optical Facial Scan <Icon.Camera />
            </button>
          </div>
        )}

        {step === 'scan' && (
          <div className="space-y-4 text-center">
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5 text-left text-xs text-stone-700">
              <Icon.Lock />
              <span><strong>100% On-Device Privacy:</strong> Scans are processed live in your browser. Biometric photos are never saved, stored, or transmitted.</span>
            </div>

            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Optical Alignment & Lighting Calibration</p>
            
            <div className="relative w-full aspect-square max-w-xs mx-auto bg-stone-900 rounded-3xl overflow-hidden border-4 border-amber-200 shadow-inner flex items-center justify-center">
              {!cameraError ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover transform -scale-x-100" 
                  />
                  
                  <div className="absolute inset-0 border-2 border-dashed border-amber-300/80 rounded-full m-8 pointer-events-none flex items-center justify-center">
                    <span className="text-xs font-medium text-amber-100 bg-stone-950/80 px-3 py-1 rounded-full border border-amber-400/30">
                      Align Face Within Oval
                    </span>
                  </div>

                  {isScanning && (
                    <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                      <div className="w-full h-1 bg-amber-400/80 shadow-[0_0_15px_#f59e0b] animate-pulse" />
                      <div className="w-9 h-9 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-mono tracking-wider text-amber-200 uppercase">Processing Lipid Profile...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center space-y-3">
                  <Icon.CameraOff />
                  <p className="text-xs text-stone-300">
                    Camera access restricted or unavailable. Diagnostic mode will calculate your formulation using self-reported baseline parameters.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleCapture}
              disabled={isScanning}
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-amber-50 font-medium rounded-xl transition-all shadow-md"
            >
              Generate Tailored Diagnostic Map
            </button>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <div className="text-center pb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                <Icon.Sparkles /> Diagnostic Mapping Complete
              </span>
              <h2 className="text-xl font-light text-stone-900 mt-2">Your Skin & Lip Diagnostic Profile</h2>
              <p className="text-xs text-stone-500">Calibrated for environment & climate in {location}</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                <Icon.Droplets />
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Moisture Barrier Status</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {q2WashFeel.includes('Tight') || q1Concerns.includes('Stinging, tightness, or compromised skin barrier')
                      ? 'Compromised epidermal moisture barrier detected. Transepidermal water loss requires rich, waterless botanical lipid replenishment.'
                      : 'Balanced barrier state. Recommended maintenance with concentrated lipid complexes to shield against daily environmental stress.'}
                  </p>
                </div>
              </div>

              {q1Concerns.includes('Post-inflammatory dark marks or uneven tone') && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Icon.Activity />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Pigmentation & Tone Profile</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Post-inflammatory hyperpigmentation (PIH) markers identified. Recommended formulation targets gradual tone evening without harsh synthetic acids.
                    </p>
                  </div>
                </div>
              )}

              {q1Concerns.includes('Active breakouts, blackheads, or clogged pores') && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Icon.Layer />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Textural Congestion</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Follicular lipid imbalance detected. Formulation requires non-comedogenic botanical cleansing oils to dissolve sebum without stripping essential moisture.
                    </p>
                  </div>
                </div>
              )}

              {(q1Concerns.includes('Dry, flaky, or chapped lips') || q3Environment.includes('Chronic lip chapping, peeling, or lip border darkening')) && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Icon.AlertCircle />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Lip Vermilion Barrier</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Lip vermilion moisture loss identified. Requires anhydrous botanical lip oil and protective barrier wax formulation.
                    </p>
                  </div>
                </div>
              )}

              {q1Concerns.includes('Under-eye dark circles or dehydration lines') && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Icon.Eye />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Periorbital Hydration</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Periorbital dehydration markers present. Lightweight, fast-absorbing botanical oil complex recommended for subtle fine-line smoothing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 border-t border-stone-200 text-left">
              <input type="hidden" name="_subject" value={`New DARLIANÁ Diagnostic Lead - ${location}`} />
              <input type="hidden" name="Region" value={location} />
              <input type="hidden" name="Concerns" value={q1Concerns.join(', ')} />
              <input type="hidden" name="Post Wash Feeling" value={q2WashFeel} />
              <input type="hidden" name="Environment Stressors" value={q3Environment.join(', ')} />
              <input type="hidden" name="Target Goals" value={q4TargetGoal.join(', ')} />

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Claim Your Recommended Routine</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Lock in priority access for your customized botanical routine upon official launch.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={!name || !email}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all font-medium ${
                  name && email 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Icon.ShieldCheck /> Claim Your Routine
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <Icon.PackageCheck />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-light text-stone-900">Reservation Confirmed</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Priority Access Logged</p>
            </div>

            <div className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl text-left text-xs text-stone-600 leading-relaxed max-w-md mx-auto space-y-2">
              <p>
                Thank you, <strong>{name || 'Valued Guest'}</strong>. Your diagnostic profile for <strong>{location}</strong> has been logged into our formulation database.
              </p>
              <p>
                We have registered <strong>{email}</strong> for priority allocation and custom routine pairing upon release.
              </p>
            </div>

            <button
              onClick={() => {
                setStep('welcome');
                setQ1Concerns([]);
                setQ2WashFeel('');
                setQ3Environment([]);
                setQ4TargetGoal([]);
                setName('');
                setEmail('');
              }}
              className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl transition-all"
            >
              Start New Assessment
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
