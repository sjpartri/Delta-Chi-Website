"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const CAROUSEL_INTERVAL_MS = 4500;
const HOME_IMAGES = [
  "/images/home_1.jpg",
  "/images/home_2.jpg",
  "/images/home_3.jpg",
  "/images/home_4.jpg",
  "/images/home_5.jpg",
  "/images/home_6.jpg",
  "/images/home_7.jpg",
  "/images/home_8.jpg",
  "/images/home_9.jpg",
  "/images/home_10.jpg",
  "/images/home_11.jpg",
  "/images/home_12.jpg",
];

export function HeroCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const imagePromises = HOME_IMAGES.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((err) => {
        console.error("Error preloading images:", err);
        setImagesLoaded(true); // Still show carousel even if some images fail
      });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % HOME_IMAGES.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [imagesLoaded]);

  return (
    <section className="relative min-h-[28rem] overflow-hidden sm:min-h-[32rem] md:min-h-[36rem]">
      {/* Carousel background */}
      {HOME_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === carouselIndex ? "z-0 opacity-100" : "z-0 opacity-0"
          }`}
          aria-hidden={i !== carouselIndex}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0 || i === 1}
            unoptimized={false}
          />
        </div>
      ))}
      <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[28rem] max-w-6xl flex-col justify-center px-4 py-20 text-white sm:min-h-[32rem] sm:px-6 sm:py-28 md:min-h-[36rem]">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Delta Chi <span className="text-delta-red">Alberta</span>
        </h1>
        <p className="mt-4 text-xl text-gray-200 sm:text-2xl">
          Brotherhood of a lifetime. Delta Chi Alberta, Canada.
        </p>
        <p className="mt-6 max-w-2xl text-gray-300">
          Promoting friendship, developing character, advancing justice, and assisting in the acquisition of a sound education.
          The Delta Chi Fraternity at the University of Alberta.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://app.chapterbuilder.com/forms/8129/view/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNDEyMTE1MiwianRpIjoiNjUyNzg4ZTgtM2MwYi00YmE2LWE1NGYtOGQ2ZjYyYmI1NTJjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ODEyOSwibmJmIjoxNzI0MTIxMTUyLCJjbGFpbXNfdHlwZSI6ImZvcm0ifQ.hpqK22OAu13z5pD2woiQf6YSnvUDzyCggWZ7VzGyD3I&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAPpHa1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadgHQatH40mL0IYcd9UKgxamLJLYxZ4UdelzRBcHIGbRhlrQ7Ks0ZdNXSR26A_aem_DDYD09QqFtexnKCk0A749A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-delta-red px-6 py-3 font-semibold text-white hover:bg-delta-red/90"
          >
            Join Delta Chi
          </a>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {HOME_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCarouselIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === carouselIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
