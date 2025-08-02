"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PdfPreview from "@/app/components/PdfPreview";
import { useFormContext } from "../context/FormContext";
import Button from "../components/Button";
import Image from "next/image";
import { useEffect } from "react";

export default function PreviewPage() {
  const router = useRouter();
  const { formData } = useFormContext();

  useEffect(() => {
    console.log(formData)
    if(!formData.name) {
        router.push("/form");
      }
  },[])

 

  const handleBack = () => {
    router.push("/form");
  };

  const handleDownload = async () => {
    const { generatePdf } = await import("@/app/utils/pdfGenerator");
    await generatePdf(formData, true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="flex-1 py-2 px-4 border-0 focus:ring-0 outline-0 cursor-pointer"
      >
        <Image width={32} height={32} alt="user" src="/svgs/chevron-left.svg" />
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-2 sm:p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">PDF Preview</h1>
          <PdfPreview data={formData} />
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleDownload}
            icon={
              <Image
                width={24}
                height={24}
                alt="user"
                src="/svgs/download.svg"
              />
            }
          >
            Download PDF
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
