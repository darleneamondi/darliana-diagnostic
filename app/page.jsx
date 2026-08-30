'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Droplets, 
  Activity, 
  Layer, 
  AlertCircle, 
  Eye, 
  PackageCheck, 
  Lock, 
  CameraOff, 
  AlertTriangle 
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('welcome'); // welcome -> quiz -> scan -> results -> success
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  
  // User Inputs
  const [location, setLocation] = useState('United States');
  const [q1Concerns, setQ1Concerns] = useState([]);
  const [q2WashFeel, setQ2WashFeel] = useState('');
  const [q3Environment, setQ3Environment] = useState([]);
  const [q4TargetGoal, setQ4TargetGoal] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const videoRef = useRef(null);

  // Calculate Progress Percentage
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

  // Cross-platform Camera Initialization (iOS Safari + Android + Desktop)
  const startCamera = async () => {
    setStep('scan');
    setCameraError(false);

    try {
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 640 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true); // Crucial for iOS Safari
        await videoRef.current.play().catch(e => console.log("Autoplay issue: ", e));
      }
    } catch (err) {
      console.log("Camera access fallback mode active:", err);
      setCameraError(true);
    }
  };

  // Safe Track Teardown
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

  // Clean up camera if user leaves or component unmounts
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

  // Step Validation checks
  const isQuizValid = q1Concerns.length > 0 && q2WashFeel !== '';

  return (
    <div className="min-h-screen bg-amber-50/40 text-stone-800 font-sans p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white border border-amber-200/60 rounded-3xl p-6 md:p-10 shadow-xl shadow-amber-900/5 relative overflow-hidden">
        
        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-stone-100">
          <div 
            className="h-full bg-amber-600 transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Brand Header */}
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

        {/* STEP 1: WELCOME & REGION */}
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
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Kenya / East Africa">Kenya / East Africa</option>
                <option value="Rest of Africa">Rest of Africa</option>
                <option value="International / Other">International / Other</option>
              </select>
            </div>

            <button
              onClick={() => setStep('quiz')}
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-amber-50 font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              Start Diagnostic Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: DIAGNOSTIC QUIZ */}
        {step === 'quiz' && (
          <div className="space-y-6 text-left">
            
            {/* Q1 */}
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
                    {q1Concerns.includes(item) && <Check className="w-4 h-4 text-amber-700 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
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

            {/* Q3 */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                3. Environmental factors & past routine exposure? (Select all that apply)
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
                    {q3Environment.includes(item) && <Check className="w-4 h-4 text-amber-700 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                4. Primary 30-day target goals? (Select all that apply)
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
                    {q4TargetGoal.includes(item) && <Check className="w-4 h-4 text-amber-700 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Enforcement Notice */}
            {!isQuizValid && (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
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
              Proceed to Optical Facial Scan <Camera className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 3: OPTICAL CAMERA SCAN */}
        {step === 'scan' && (
          <div className="space-y-4 text-center">
            
            {/* Privacy Shield Banner */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5 text-left text-xs text-stone-700">
              <Lock className="w-4 h-4 text-amber-800 shrink-0" />
              <span><strong>100% On-Device Privacy:</strong> Scans are processed live in your browser. Biometric photos are never saved, stored, or transmitted.</span>
            </div>

            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Optical Alignment & Lighting Calibration</p>
            
            {/* Camera View / Fallback */}
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
                  
                  {/* KYC Oval Alignment Guide */}
                  <div className="absolute inset-0 border-2 border-dashed border-amber-300/80 rounded-full m-8 pointer-events-none flex items-center justify-center">
                    <span className="text-xs font-medium text-amber-100 bg-stone-950/80 px-3 py-1 rounded-full border border-amber-400/30">
                      Align Face Within Oval
                    </span>
                  </div>

                  {/* Scanning Laser animation */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                      <div className="w-full h-1 bg-amber-400/80 shadow-[0_0_15px_#f59e0b] animate-pulse" />
                      <div className="w-9 h-9 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-mono tracking-wider text-amber-200 uppercase">Processing Lipid Profile...</span>
                    </div>
                  )}
                </>
              ) : (
                /* Camera Access Fallback UI */
                <div className="p-6 text-center space-y-3">
                  <CameraOff className="w-10 h-10 text-amber-400 mx-auto" />
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

        {/* STEP 4: ACCURATE DYNAMIC RESULTS & WAITLIST */}
        {step === 'results' && (
          <div className="space-y-6">
            
            <div className="text-center pb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> Diagnostic Mapping Complete
              </span>
              <h2 className="text-xl font-light text-stone-900 mt-2">Your Skin & Lip Diagnostic Profile</h2>
              <p className="text-xs text-stone-500">Calibrated for environment & climate in {location}</p>
            </div>

            {/* DYNAMIC DIAGNOSTIC BREAKDOWN */}
            <div className="space-y-3">
              
              {/* Barrier State */}
              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                <Droplets className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Moisture Barrier Status</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {q2WashFeel.includes('Tight') || q1Concerns.includes('Stinging, tightness, or compromised skin barrier')
                      ? 'Compromised epidermal moisture barrier detected. Transepidermal water loss requires rich, waterless botanical lipid replenishment.'
                      : 'Balanced barrier state. Recommended maintenance with concentrated lipid complexes to shield against daily environmental stress.'}
                  </p>
                </div>
              </div>

              {/* Pigmentation */}
              {q1Concerns.includes('Post-inflammatory dark marks or uneven tone') && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Activity className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Pigmentation & Tone Profile</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Post-inflammatory hyperpigmentation (PIH) markers identified. Recommended formulation targets gradual tone evening without harsh synthetic acids.
                    </p>
                  </div>
                </div>
              )}

              {/* Textural Congestion */}
              {q1Concerns.includes('Active breakouts, blackheads, or clogged pores') && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Layer className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Textural Congestion</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Follicular lipid imbalance detected. Formulation requires non-comedogenic botanical cleansing oils to dissolve sebum without stripping essential moisture.
                    </p>
                  </div>
                </div>
              )}

              {/* Lip Barrier */}
              {(q1Concerns.includes('Dry, flaky, or chapped lips') || q3Environment.includes('Chronic lip chapping, peeling, or lip border darkening')) && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Lip Vermilion Barrier</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Lip vermilion moisture loss identified. Requires anhydrous botanical lip oil and protective barrier wax formulation.
                    </p>
                  </div>
                </div>
              )}

              {/* Under-Eye */}
              {q1Concerns.includes('Under-eye dark circles or dehydration lines') && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-left">
                  <Eye className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Periorbital Hydration</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Periorbital dehydration markers present. Lightweight, fast-absorbing botanical oil complex recommended for subtle fine-line smoothing.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* FORM SUBMIT ENDPOINT */}
            <form 
              onSubmit={handleFormSubmit}
              className="space-y-4 pt-4 border-t border-stone-200 text-left"
            >
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
                <ShieldCheck className="w-5 h-5" /> Claim Your Routine
              </button>
            </form>
          </div>
        )}

        {/* STEP 5: FINAL CONFIRMATION / THANK YOU PAGE */}
        {step === 'success' && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <PackageCheck className="w-8 h-8" />
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
