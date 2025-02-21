"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultantCategories = [
    { name: "الأعمال", icon: "💼" },
    { name: "التكنولوجيا", icon: "💻" },
    { name: "الصحة", icon: "🩺" },
    { name: "التعليم", icon: "📚" },
    { name: "المالية", icon: "💰" },
  ];
  

export default function DemoSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const nextCategory = () => {
    setActiveCategory((prev) => (prev + 1) % consultantCategories.length);
  };

  const prevCategory = () => {
    setActiveCategory(
      (prev) =>
        (prev - 1 + consultantCategories.length) % consultantCategories.length,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 rounded-lg p-2 lg:p-8 bg-accent"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold">
      استكشاف فئات الاستشاريين
      </h2>
      <div className="flex items-center justify-center ">
        <Button variant="outline" size="icon" onClick={prevCategory}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <div className="flex flex-wrap items-center justify-center space-x-4">
          {consultantCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: index === activeCategory ? 1 : 0.5,
                scale: index === activeCategory ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
              className="text-center w-20"
            >
              <div className="mb-2 text-4xl">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </motion.div>
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextCategory}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
