import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const handleSubmit = async (
  values,
  updateSubmitApi,
  errorMessage,
  successMessage,
  itemID,
  setSelectedItem
) => {
  const payload = {
    itemID,
    relatedItems: values.selectedRelatedItems.map((item) => item.value),
  };

  try {
    const response = await fetch(updateSubmitApi, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(errorMessage);

    alert(successMessage); // Handle success message
    setSelectedItem(null);
  } catch (error) {
    console.error(errorMessage, error); // Handle error message
    alert(errorMessage);
  }
};

const DynamicUpdateListItem = ({
  updateFormTitle,
  updateSubmitApi,
  itemID,
  getItemApi,
  relatedItemList,
  successMessage,
  errorMessage,
}) => {
  const { fetchAllCourses, allCourses } = useMajor();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mappedOptions, setMappedOptions] = useState([]);

  useEffect(() => {
    fetchAllCourses(); // Fetch all courses initially
  }, [fetchAllCourses]);

  useEffect(() => {
    // Fetch related items when selectedItem changes
    if (selectedItem) {
      fetch(getItemApi(selectedItem._id))
        .then((response) => response.json())
        .then((data) => {
          setMappedOptions(data.relatedItems);
        })
        .catch((error) =>
          console.error("Fetching related items failed:", error)
        );
    } else {
      setMappedOptions([]);
    }
  }, [selectedItem, getItemApi]);

  const handleChangeDropdown = (selectedId) => {
    const foundItem = allCourses.find((item) => item._id === selectedId);
    setSelectedItem(foundItem);
  };

  return (
    <div className="container mx-auto p-4">
      <Select options={relatedItemList} onChange={handleChangeDropdown} />
      {selectedItem && (
        <Formik
          initialValues={{ selectedRelatedItems: [] }}
          onSubmit={(values) =>
            handleSubmit(
              values,
              updateSubmitApi,
              errorMessage,
              successMessage,
              itemID,
              setSelectedItem
            )
          }
        >
          {({ setFieldValue }) => (
            <Form>
              <Select
                isMulti
                name="selectedRelatedItems"
                options={mappedOptions}
                onChange={(selectedOptions) => {
                  setFieldValue("selectedRelatedItems", selectedOptions);
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DynamicUpdateListItem;
