"use client";
// import { useState } from 'react';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FormInput from "@/app/components/FormInput";
// import { validateEmail, validatePhone } from '@/app/utils/validation';
import { useFormContext } from "../context/FormContext";
import Button from "../components/Button";
import Image from "next/image";

export default function FormPage() {
  const router = useRouter();
  const { formData, setFormData, errors, validateForm } = useFormContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleViewPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      router.push("/preview");
    }
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { generatePdf } = await import("@/app/utils/pdfGenerator");
      await generatePdf(formData, true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Your Details
        </h1>

        <form className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            placeholder="eg. Dhruv Roy"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="eg. dhruv@dhruv.roy"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            label="Phone Number"
            name="phone"
            placeholder="eg. +91 981832389X"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          <FormInput
            label="Position"
            name="position"
            placeholder="eg. frontend engineer"
            value={formData.position}
            onChange={handleChange}
          />

          <FormInput
            label="Description"
            name="description"
            placeholder="eg. self-motivated professional"
            value={formData.description}
            onChange={handleChange}
          />

          <FormInput
            label="PDF File Name (without extension)"
            name="fileName"
            value={formData.fileName}
            onChange={handleChange}
          />

          <div className="flex space-x-4 mt-6">
            <Button onClick={handleViewPdf} icon={<></>}>
              View PDF
            </Button>
            <Button onClick={handleDownload} icon={<Image width={24} height={24} alt="user" src="/svgs/download.svg" />}>
              Download PDF
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
