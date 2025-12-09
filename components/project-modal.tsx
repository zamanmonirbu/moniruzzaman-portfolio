"use client";

import Image from "next/image";
import type { Project } from "@/lib/types";
import { useState } from "react";

// Reusable blurred placeholder (tiny 8px base64)
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNMQIoIFMNP//Z";

const LiveButton = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-xl"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
    Watch Video
  </a>
);

const CodeButton = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm font-medium bg-muted text-foreground px-6 py-3 rounded-xl hover:bg-muted/70 border border-border/50 transition-all"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
    {label}
  </a>
);

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}


export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const allImages = [project.timelinePhoto, ...project.otherPhotos].filter(
    Boolean
  ) as string[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-xl pt-10 pb-20"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl mx-auto px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 bg-background/90 backdrop-blur-md text-foreground hover:scale-110 transition-all w-12 h-12 rounded-full flex items-center justify-center text-3xl shadow-2xl"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Visuals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-foreground/5">
              <Image
                src={allImages[selectedImage]}
                alt={`${project.name} - Screenshot ${selectedImage + 1}`}
                width={1400}
                height={900}
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 80vw, 1100px"
                className="w-full h-auto object-cover"
                priority={selectedImage === 0}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />

              {/* Play Button Overlay if Video Exists */}
              {project.videoLink && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <a
                    href={project.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all p-6 rounded-full shadow-2xl"
                    aria-label="Watch demo video"
                  >
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-primary shadow-lg ring-4 ring-primary/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      width={400}
                      height={240}
                      sizes="150px"
                      className="w-full h-auto aspect-video object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Embedded Video (optional) */}
            {project.videoLink && (
              <div className="mt-10 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <iframe
                  src={project.videoLink.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                  title={`${project.name} demo video`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Right Column - Details (Sticky on large screens) */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-8 border border-border/50 shadow-2xl">
              <h1 className="text-4xl font-bold mb-3">{project.name}</h1>

              <p className="text-foreground/80 leading-relaxed mb-6">
                {project.description}
              </p>

              <time className="text-sm text-foreground/50 block mb-8">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </time>

              {/* Technologies */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Site
                  </a>
                )}

                <div className="flex gap-3">
                  {project.frontendCode && (
                    <CodeButton href={project.frontendCode} label="Frontend Code" />
                  )}
                  {project.backendCode && (
                    <CodeButton href={project.backendCode} label="Backend Code" />
                  )}
                </div>

                {project.videoLink && <LiveButton href={project.videoLink} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}