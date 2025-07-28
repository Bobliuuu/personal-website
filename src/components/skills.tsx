"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { skillCategories } from "@/constants/skills";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0]);

  const handleCategoryClick = (category: SkillCategory) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <style jsx>{`
        .book-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          perspective: 1000px;
        }
        
        .box-out {
          width: 720px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }
        
        .book {
          width: 180px;
          height: 255px;
          background-color: rgb(62, 71, 152);
          transition: all .3s ease-in-out;
          transform-origin: left center 0px;
          transform-style: preserve-3d;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 30px;
          box-sizing: border-box;
          cursor: pointer;
        }
        
        .book-title {
          color: white;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          line-height: 1.2;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          font-family: 'Georgia', serif;
        }
        
        .book::after {
          content: " ";
          display: block;
          opacity: 0;
          width: 180px;
          height: 255px;
          position: absolute;
          top: 0;
          left: 0;
          transition: all .3s ease;
          pointer-events: none;
        }
        
        .book::before {
          content: " ";
          z-index: 999;
          display: block;
          width: 20px;
          height: 100px;
          opacity: 0;
          position: absolute;
          top: -12px;
          right: 8px;
          transition: all .25s;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAABhCAYAAABh23lYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHCSURBVHgB7dxPTsJAHMXxN7Xu3UhigobxJHACvQFwAr2BcgO8AZxE7uGiDZiQyEIW7oSOUyKbKgLS8u+9b9JNF818fum0XdWUhy9VEDZBGIdBGD6DsFM3bQYgTnjWhGdNeNaEZ0141oRnTXjWhGdNeNaEZ0141oRnTXjWhGdNeNaEZ0141oRnTXjWhGdNeNaEZ0141oRnTXjWhGdNeNaEZ0141oRnTXjWhGdNeNaEZ0141oRnTXjWhGdNeNZ2hR/7o+UcmnCIsaNCbLcU/RR8oB1bO/4+17l8ixoGeIBBBVvMXI0ih+L7Df2j8iiqnvgh+AVVUXDOTZvF4tNb2qC7DJ1tNgSDO78tblFQxeE92l+0NSjZDjaoMowqyYl7hDF15JzL+x+YHtxLgFq/ZO2m8LT4wsb90nUjmMD61XaRc7ng5+jBua29ntsecq6oIWyELxqdLe8h/GvPp+h0T28D/FezZ8Ip7pHgZt3X5NoPvH1BZ5sNIUTDL7C+6hBWxxt0gk+00tsOe96qH0zL8GO4pBtMg/YhoLMtG8Ii/EpfY4fSoiFk8UeFzpYdwhz/jiNGZ0uHEBjUEzftohJFZyAsdX8BM0/amLC3spYAAAAASUVORK5CYII=');
          background-size: 16px;
          background-repeat: no-repeat;
          pointer-events: none;
        }
        
        .book:hover {
          transform: rotateY(-28deg) rotateZ(-2deg) scale(1.02);
          -webkit-backface-visibility: hidden;
          box-shadow: 1px 3px 2px #353d85, 20px 8px 0 #525dc4;
        }
        
        .book:hover::after {
          opacity: 1;
          background: linear-gradient(-180deg, rgba(255, 255, 255, .1) 0%, rgba(255, 255, 255, 0) 60%);
        }
        
        .book:hover::before {
          transform: translateY(9px);
          opacity: 1;
        }
        
        .selected-book {
          transform: rotateY(-15deg) rotateZ(-1deg) scale(1.05);
          box-shadow: 1px 3px 2px #353d85, 20px 8px 0 #525dc4;
        }
        
        .selected-book::after {
          opacity: 0.7;
          background: linear-gradient(-180deg, rgba(255, 255, 255, .15) 0%, rgba(255, 255, 255, 0) 60%);
        }
      `}</style>
      
      <section className="w-full mx-auto px-12 sm:px-16 lg:px-24 mt-12 mb-12">
        <h2 className="animate-glow text-4xl font-semibold mb-8 text-center text-transparent bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text">
          Skills
        </h2>

        <div className="w-full flex flex-col items-center justify-center rounded-xl overflow-hidden">
          {/* Book container */}
          <div className="w-full max-w-6xl mb-8">
            <div className="book-container">
              <div className="box-out">
                {skillCategories.map((category, index) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className={`book ${selectedCategory?.id === category.id ? 'selected-book' : ''}`}
                  >
                    <div className="book-title">
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills displayed only for selected category */}
          {selectedCategory && (
            <div className="w-full max-w-6xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {selectedCategory.name}
                </h3>
                <p className="text-gray-400">
                  {selectedCategory.description}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {selectedCategory.skills.map((skill, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="border border-white bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}