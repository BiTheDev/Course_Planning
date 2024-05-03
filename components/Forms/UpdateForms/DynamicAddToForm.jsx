"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Formik, Form } from "formik";
import Dropdown from "@/components/General/Dropdown";
import { useMajor } from "@/components/General/MajorProvider";

const DynamicAddToForm = ({
  formType,
  fetchRelatedDataUrl,
  submitUrl,
  relatedAvailableIds,
  filteredRelatedIds,
  filteredOptions,
  dropdownType,
  dropdownLabelProperty,
  successMessage,
  errorMessage,
}) => {
  const {
    fetchAllCourses,
    fetchAllInstructors,
    allCourses,
    instructors,
    semesters,
  } = useMajor();
  const [selectedItem, setSelectedItem] = useState(null);
  const [relatedAvailableDataList, setRelatedAvailableDataList] = useState([]);
  const [selectedRelatedDataList, setSelectedRelatedDataList] = useState([]);

  const prevFormTypeRef = useRef(formType);

  useEffect(() => {
    if (prevFormTypeRef.current !== formType) {
      // Only reset states if formType has changed
      setSelectedItem(null);
      setRelatedAvailableDataList([]);
      setSelectedRelatedDataList([]);
      // Update the ref to the new formType
      prevFormTypeRef.current = formType;

      // Fetch data based on the new formType
      if (formType === "AddInstructorToCourse") {
        fetchAllInstructors();
      }
      fetchAllCourses();
    }
    // Ensure to clear the state when formType changes
  }, [formType, fetchAllCourses, fetchAllInstructors]);

  useEffect(() => {
    if (selectedItem) {
      fetch(fetchRelatedDataUrl(selectedItem._id))
        .then((response) => response.json())
        .then((data) => {
          let availableIds = relatedAvailableIds(data);
          let filteredIds;
          if (formType === "AddCourseToSemester") {
            filteredIds = filteredRelatedIds(allCourses, availableIds);
          } else if (formType === "AddInstructorToCourse") {
            filteredIds = filteredRelatedIds(instructors, availableIds);
          }
          setRelatedAvailableDataList(filteredIds);
          console.log(filteredIds);
        })
        .catch((error) =>
          console.error("Fetching related data failed:", error)
        );
    } else {
      // Clear related data list if selectedItem is cleared or not selected
      setRelatedAvailableDataList([]);
    }
  }, [selectedItem, fetchRelatedDataUrl, dropdownLabelProperty]);

  const dropdownData =
    formType === "AddInstructorToCourse" ? allCourses : semesters;

  console.log(relatedAvailableDataList);
  let mappedOptions = filteredOptions(relatedAvailableDataList);

  const handleChangeDropdown = (selectedId) => {
    const foundItem = dropdownData.find((item) => item._id === selectedId);
    setSelectedItem(foundItem);
    setSelectedRelatedDataList([]);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      [formType === "AddInstructorToCourse" ? "instructors" : "courses"]:
        values.selectedRelatedData.map((d) => d.value),
    };

    try {
      const response = await fetch(submitUrl(selectedItem._id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(errorMessage);

      alert(successMessage);
      resetForm();
      // Reset the form state after successful submission
      setSelectedItem(null);
      setSelectedRelatedDataList([]);
    } catch (error) {
      console.error(errorMessage, error);
      alert(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Dropdown
        data={dropdownData}
        onDataChange={handleChangeDropdown}
        selectedData={selectedItem}
        dropDownType={dropdownType}
        labelProperty={dropdownLabelProperty}
      />
      {selectedItem && (
        <Formik
          initialValues={{ selectedRelatedData: [] }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Select
                isMulti
                name="selectedRelatedData"
                options={mappedOptions}
                className="basic-multi-select mb-4"
                classNamePrefix="select"
                value={selectedRelatedDataList}
                onChange={(selectedOptions) => {
                  setSelectedRelatedDataList(selectedOptions);
                  setFieldValue("selectedRelatedData", selectedOptions);
                }}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DynamicAddToForm;
