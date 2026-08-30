"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Camera,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Droplets,
  Activity,
  Layers,
  AlertCircle,
  Eye,
  PackageCheck,
} from "lucide-react"

type Step = "welcome" | "quiz" | "scan" | "results" | "success"

export default function DarlianaDiagnostic() {
  const [step, setStep] = useState<Step>("welcome")
  const [isScanning, setIsScanning] = useState(false)

  // User Inputs
  const [location, setLocation] = useState("United States")
  const [q1Concerns, setQ1Concerns] = useState<string[]>([])
  const [q2WashFeel, setQ2WashFeel] = useState("")
  const [q3Environment, setQ3Environment] = useState<string[]>([])
  const [q4TargetGoal, setQ4TargetGoal] = useState<string[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const toggleMulti = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const startCamera = async () => {
    setStep("scan")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.log("[v0] Camera access fallback mode active.")
    }
  }

  const handleCapture = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      const video = videoRef.current
      if (video && video.srcObject) {
        ;(video.srcObject as MediaStream).getTracks().forEach((track) => track.stop())
      }
      setStep("results")
    }, 2200)
  }

  const handleFormSubmit = () => {
    setStep("success")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50/40 p-4 font-sans text-stone-800 md:p-8">
      <div className="w-full max-w-2xl rounded-3xl border border-amber-200/60 bg-white p-6 shadow-xl shadow-amber-900/5 md:p-10">
        {/* Brand Header */}
        <header className="mb-8 text-center">
          <span className="rounded-full border border-amber-200 bg-amber-100/80 px-5 py-2 text-xs font-bold uppercase tracking-widest text-amber-800">
            DARLIANÁ
          </span>
          <h1 className="mt-4 text-2xl font-light tracking-wide text-stone-900 md:text-3xl">AI Diagnostic Engine</h1>
        </header>

        {/* STEP 1: WELCOME & REGION */}
        {step === "welcome" && (
          <div className="space-y-6">
            <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-stone-600">
              Welcome to DARLIANÁ. Begin your personalized diagnostic analysis for moisture barrier integrity,
              hyperpigmentation mapping, and recommended botanical routine matching.
            </p>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 text-left">
              <label
                htmlFor="region"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-amber-900"
              >
                Select Your Region
              </label>
              <select
                id="region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-amber-200 bg-white p-3.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Kenya / East Africa">Kenya / East Africa</option>
                <option value="Rest of Africa">Rest of Africa</option>
                <option value="International / Other">International / Other</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setStep("quiz")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-4 font-medium text-amber-50 shadow-md transition-all hover:bg-stone-800"
            >
              Start Diagnostic Assessment <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2: DIAGNOSTIC QUIZ */}
        {step === "quiz" && (
          <div className="space-y-6 text-left">
            {/* Q1 */}
            <fieldset>
              <legend className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-900">
                1. What are your primary skin & lip concerns today? (Select all that apply)
              </legend>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Active breakouts, blackheads, or clogged pores",
                  "Stinging, tightness, or compromised skin barrier",
                  "Post-inflammatory dark marks or uneven tone",
                  "Dry, flaky, or chapped lips",
                  "Under-eye dark circles or dehydration lines",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMulti(q1Concerns, setQ1Concerns, item)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all md:text-sm ${
                      q1Concerns.includes(item)
                        ? "border-amber-600 bg-amber-50 font-medium text-amber-950"
                        : "border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50"
                    }`}
                  >
                    <span>{item}</span>
                    {q1Concerns.includes(item) && <Check className="ml-2 h-4 w-4 shrink-0 text-amber-700" />}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Q2 */}
            <fieldset>
              <legend className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-900">
                2. How does your face feel 15 to 30 minutes after cleansing? (Select single best answer)
              </legend>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Tight, uncomfortable, or dry (needs immediate moisture)",
                  "Excessively oily or shiny all over",
                  "Oily T-zone (forehead/nose), but dry or normal cheeks",
                  "Stings or turns red easily when applying products",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQ2WashFeel(item)}
                    className={`rounded-xl border p-3.5 text-left text-xs transition-all md:text-sm ${
                      q2WashFeel === item
                        ? "border-amber-600 bg-amber-50 font-medium text-amber-950"
                        : "border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Q3 */}
            <fieldset>
              <legend className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-900">
                3. Environmental factors & past routine exposure? (Select all that apply)
              </legend>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Frequent exposure to dust, city air, sweat, or makeup",
                  "Past use of harsh bar soaps, topical steroid creams, or aggressive scrubs",
                  "Minimal current routine (water and basic cleanser)",
                  "Chronic lip chapping, peeling, or lip border darkening",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMulti(q3Environment, setQ3Environment, item)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all md:text-sm ${
                      q3Environment.includes(item)
                        ? "border-amber-600 bg-amber-50 font-medium text-amber-950"
                        : "border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50"
                    }`}
                  >
                    <span>{item}</span>
                    {q3Environment.includes(item) && <Check className="ml-2 h-4 w-4 shrink-0 text-amber-700" />}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Q4 */}
            <fieldset>
              <legend className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-900">
                4. Primary 30-day target goals? (Select all that apply)
              </legend>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Clear active breakouts and fade post-inflammatory dark marks",
                  "Soothe irritation and rebuild epidermal moisture barrier",
                  "Restore natural skin radiance and smooth texture",
                  "Achieve deeply hydrated, smooth, and plump lips",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMulti(q4TargetGoal, setQ4TargetGoal, item)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all md:text-sm ${
                      q4TargetGoal.includes(item)
                        ? "border-amber-600 bg-amber-50 font-medium text-amber-950"
                        : "border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-100/50"
                    }`}
                  >
                    <span>{item}</span>
                    {q4TargetGoal.includes(item) && <Check className="ml-2 h-4 w-4 shrink-0 text-amber-700" />}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={startCamera}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-4 font-medium text-white shadow-md transition-all hover:bg-amber-700"
            >
              Proceed to Facial Diagnostic Scan <Camera className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* STEP 3: OPTICAL CAMERA SCAN */}
        {step === "scan" && (
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Optical Alignment & Lighting Calibration
            </p>
            <div className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-3xl border-4 border-amber-200 bg-stone-900 shadow-inner">
              <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />

              <div className="pointer-events-none absolute inset-0 m-8 flex items-center justify-center rounded-full border-2 border-dashed border-amber-300/80">
                <span className="rounded-full border border-amber-400/30 bg-stone-950/80 px-3 py-1 text-xs font-medium text-amber-100">
                  Align Face Within Oval
                </span>
              </div>

              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-950/70 backdrop-blur-sm">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-200">
                    Calculating Skin Parameters...
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleCapture}
              disabled={isScanning}
              className="w-full rounded-xl bg-stone-900 py-4 font-medium text-amber-50 shadow-md transition-all hover:bg-stone-800 disabled:opacity-70"
            >
              Generate Tailored Diagnostic Map
            </button>
          </div>
        )}

        {/* STEP 4: RESULTS & ROUTINE MATCH */}
        {step === "results" && (
          <div className="space-y-6">
            <div className="pb-2 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                <Sparkles className="h-3.5 w-3.5" /> Diagnostic Mapping Complete
              </span>
              <h2 className="mt-2 text-xl font-light text-stone-900">Your AI Diagnostic Profile</h2>
              <p className="text-xs text-stone-500">Calibrated for environment & climate in {location}</p>
            </div>

            {/* DYNAMIC DIAGNOSTIC BREAKDOWN */}
            <div className="space-y-3">
              {/* Barrier State */}
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-left">
                <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Moisture Barrier Status</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">
                    {q2WashFeel.includes("Tight") ||
                    q1Concerns.includes("Stinging, tightness, or compromised skin barrier")
                      ? "Compromised epidermal moisture barrier detected. High rate of moisture loss requiring concentrated botanical oil replenishment."
                      : "Balanced barrier state. Recommended maintenance with concentrated botanical complexes to shield against daily environmental stress."}
                  </p>
                </div>
              </div>

              {/* Pigmentation */}
              {q1Concerns.includes("Post-inflammatory dark marks or uneven tone") && (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-left">
                  <Activity className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Pigmentation & Tone Profile
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      Post-inflammatory hyperpigmentation (PIH) markers identified. Recommended formulation targets
                      gradual tone evening without harsh synthetic acids.
                    </p>
                  </div>
                </div>
              )}

              {/* Textural Congestion */}
              {q1Concerns.includes("Active breakouts, blackheads, or clogged pores") && (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-left">
                  <Layers className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Textural Congestion</h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      Follicular congestion detected. Formulation requires non-comedogenic botanical cleansing oils to
                      dissolve surface sebum without stripping essential moisture.
                    </p>
                  </div>
                </div>
              )}

              {/* Lip Barrier */}
              {(q1Concerns.includes("Dry, flaky, or chapped lips") ||
                q3Environment.includes("Chronic lip chapping, peeling, or lip border darkening")) && (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-left">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Lip Barrier Integrity</h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      Lip vermilion moisture loss identified. Requires botanical lip oil and protective barrier wax
                      formulation.
                    </p>
                  </div>
                </div>
              )}

              {/* Under-Eye */}
              {q1Concerns.includes("Under-eye dark circles or dehydration lines") && (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-left">
                  <Eye className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Periorbital Hydration</h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      Periorbital dehydration markers present. Lightweight, fast-absorbing botanical oil complex
                      recommended for subtle fine-line smoothing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ROUTINE CLAIM FORM */}
            <form
              action="https://formsubmit.co/darleneamondi1@gmail.com"
              method="POST"
              onSubmit={handleFormSubmit}
              className="space-y-4 border-t border-stone-200 pt-4 text-left"
            >
              <input type="hidden" name="_subject" value={`DARLIANÁ Routine Claim - ${location}`} />
              <input type="hidden" name="Region" value={location} />
              <input type="hidden" name="Concerns" value={q1Concerns.join(", ")} />
              <input type="hidden" name="Post Wash Feeling" value={q2WashFeel} />
              <input type="hidden" name="Environment Stressors" value={q3Environment.join(", ")} />
              <input type="hidden" name="Target Goals" value={q4TargetGoal.join(", ")} />

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Claim Your Recommended Routine
                </h4>
                <p className="mt-1 text-xs text-stone-600">
                  Lock in priority access to your matched botanical routine upon official collection availability.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-4 font-medium text-white shadow-md transition-all hover:bg-amber-700"
              >
                <ShieldCheck className="h-5 w-5" /> Claim Your Recommended Routine
              </button>
            </form>
          </div>
        )}

        {/* STEP 5: ENDING CONFIRMATION SCREEN */}
        {step === "success" && (
          <div className="space-y-6 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-200 bg-amber-100 text-amber-800">
              <PackageCheck className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-light text-stone-900">Routine Claim Confirmed</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Diagnostic Profile Logged</p>
            </div>

            <div className="mx-auto max-w-md space-y-2 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 text-left text-xs leading-relaxed text-stone-600">
              <p>
                Thank you, <strong>{name || "Valued Guest"}</strong>. Your personalized diagnostic profile for{" "}
                <strong>{location}</strong> has been saved.
              </p>
              <p>
                We have registered <strong>{email}</strong> for launch priority and personalized routine updates.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep("welcome")
                setQ1Concerns([])
                setQ3Environment([])
                setQ4TargetGoal([])
                setName("")
                setEmail("")
              }}
              className="rounded-xl bg-stone-100 px-6 py-2.5 text-xs font-medium text-stone-700 transition-all hover:bg-stone-200"
            >
              Start New Diagnostic Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
