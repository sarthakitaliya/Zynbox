"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RequireAuth } from "@/components/RequireAuth";
import { useCategoryStore } from "@repo/store";

interface Category {
  name: string;
  description: string;
}

export default function SetupCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([
    { name: "", description: "" },
    { name: "", description: "" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [checkingCategorys, setCheckingCategories] = useState(true);
  const { createCategories, checkCategories } = useCategoryStore();

  useEffect(() => {
    const checkIfUserHasCategories = async () => {
      const hasCategories: boolean = await checkCategories();
      if (hasCategories) {
        router.push("/dashboard");
      } else {
        setCheckingCategories(false);
      }
    };
    checkIfUserHasCategories();
  }, []);

  if (checkingCategorys) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const updateCategory = (field: keyof Category, value: string) => {
    const newCategories = [...categories];
    newCategories[currentStep][field] = value;
    setCategories(newCategories);
  };

  const validateCurrentCategory = () => {
    const current = categories[currentStep];
    if (!current.name.trim() || !current.description.trim()) {
      setError("Please fill in both name and description");
      return false;
    }
    setError("");
    return true;
  };

  const getCompletedCategories = () => {
    return categories.filter((cat) => cat.name.trim() && cat.description.trim())
      .length;
  };

  const handleNext = async () => {
    if (!validateCurrentCategory()) return;

    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (categories.length < 4) {
      setCategories([...categories, { name: "", description: "" }]);
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const completedCategories = categories.filter(
          (cat) => cat.name.trim() && cat.description.trim()
        );

        await createCategories(completedCategories);
        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to save categories", error);
        setError("Failed to save categories. Please try again.");
      }
    }
  };

  const handleSkip = async () => {
    if (getCompletedCategories() < 2) {
      setError("Please complete at least 2 categories before skipping");
      return;
    }
    try {
      const completedCategories = categories.filter(
        (cat) => cat.name.trim() && cat.description.trim()
      );
      await createCategories(completedCategories);
      router.push("/mail/inbox");
    } catch (error) {
      console.error("Failed to skip categories", error);
      setError("Failed to skip categories. Please try again.");
    }
  };

  const currentCategory = categories[currentStep];
  const completedCategories = getCompletedCategories();
  const canSkip = completedCategories >= 2;
  const isLastStep = currentStep === categories.length - 1;

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Organize Your Emails
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Create at least 2 categories to organize your emails. You can add
              up to 4 categories.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {completedCategories} of {categories.length} categories completed
            </p>

            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${((currentStep + 1) / Math.max(4, categories.length)) * 100}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
                  />
                </div>
                <div className="flex justify-between">
                  {Array.from({ length: Math.max(4, categories.length) }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index <= currentStep
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={currentCategory.name}
                  onChange={(e) => updateCategory("name", e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder:text-gray-400 text-gray-900"
                  placeholder="e.g., Work, Personal, Finance"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={currentCategory.description}
                  onChange={(e) =>
                    updateCategory("description", e.target.value)
                  }
                  rows={3}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder:text-gray-400 text-gray-900"
                  placeholder="Describe what this category is for"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex justify-between items-center pt-6">
                <div>
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      Back
                    </button>
                  )}
                </div>
                <div className="space-x-4">
                  {canSkip && (
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      Skip
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    {isLastStep ? "Save" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </RequireAuth>
  );
}
