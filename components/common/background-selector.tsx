"use client";

import { useState, useRef } from "react";
import { useBackgroundStore, backgroundOptions } from "@/hooks/use-background-store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, X, Check } from "lucide-react";
import Image from "next/image";

export function BackgroundSelector() {
  const {
    currentBackground,
    selectedBackgroundId,
    setBackground,
    customBackgrounds,
    addCustomBackground,
    resetBackground,
  } = useBackgroundStore();

  const [isOpen, setIsOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allOptions = [...backgroundOptions, ...customBackgrounds];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newOption = {
          id: `custom-${Date.now()}`,
          name: `Custom ${customBackgrounds.length + 1}`,
          url: result,
          thumbnail: result,
          type: "custom" as const,
        };
        addCustomBackground(newOption);
        setUploadMode(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = (background: string, id: string) => {
    setBackground(background, id);
  };

  const handleReset = () => {
    resetBackground();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{
              background: currentBackground || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />
          Background
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Chat Background</DialogTitle>
        </DialogHeader>

        {/* Upload Button */}
        <div className="mb-4">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setUploadMode(!uploadMode)}
          >
            <Upload className="w-4 h-4" />
            {uploadMode ? "Cancel Upload" : "Upload Custom Background"}
          </Button>

          {uploadMode && (
            <div className="mt-4 p-4 border-2 border-dashed rounded-lg text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mb-2"
              >
                Choose Image
              </Button>
              <p className="text-sm text-muted-foreground">
                Select an image from your device
              </p>
            </div>
          )}
        </div>

        {/* Background Options Grid */}
        <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
          {/* Default/None Option */}
          <button
            key="default"
            onClick={() => handleSelect("", "default")}
            className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${
              selectedBackgroundId === "default"
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-muted-foreground/50"
            }`}
            style={{ background: "transparent" }}
          >
            {selectedBackgroundId === "default" && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <X className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </button>

          {/* Preset Gradients */}
          {allOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.url, option.id)}
              className={`aspect-square rounded-lg border-2 transition-all relative overflow-hidden ${
                selectedBackgroundId === option.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/50"
              }`}
              style={{ background: option.type === "preset" ? option.thumbnail : undefined }}
            >
              {option.type === "custom" ? (
                <Image
                  src={option.thumbnail}
                  alt={option.name}
                  fill
                  className="object-cover"
                />
              ) : null}
              {option.type === "preset" && (
                <div
                  className="w-full h-full"
                  style={{ background: option.thumbnail }}
                />
              )}
              {selectedBackgroundId === option.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary-foreground drop-shadow-md" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="flex justify-between mt-4 pt-4 border-t">
          <Button variant="ghost" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Component that applies the background
export function BackgroundDisplay() {
  const { currentBackground } = useBackgroundStore();

  if (!currentBackground) return null;

  // Check if it's a gradient (contains 'gradient') or an image URL
  const isGradient = currentBackground.includes("gradient");
  
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundColor: isGradient ? undefined : currentBackground,
        backgroundImage: isGradient ? currentBackground : undefined,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    />
  );
}
