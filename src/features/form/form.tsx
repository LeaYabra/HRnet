import { useState } from "react"
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { saveFormEmployee } from "./actions"
import { RootState } from "../../app/store"
import { AppDispatch } from "../../app/store"
import states from "./states"

const CustomForm = () => {
  const dispatch: AppDispatch = useDispatch()
  const formState = useSelector((state: RootState) => state.form)

  const [formData, setFormData] = useState({
    success: formState.success,
    error: formState.error,
    firstName: formState.firstName,
    lastName: formState.lastName,
    dateOfBirth: formState.dateOfBirth,
    startDate: formState.startDate,
    department: formState.department,
    street: formState.street,
    city: formState.city,
    states: formState.states,
    zipCode: formState.zipCode,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSaveEmployee = () => {
    dispatch(saveFormEmployee(formData))
  }

  return (
    <>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        style={{ minWidth: 300, maxWidth: 600 }}
      >
        <Form.Item label="FirstName">
          <Input
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="LastName">
          <Input
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Date of Birth">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item label="Start Date">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <fieldset name="address">
          <legend>Address</legend>
          <Form.Item label="Street">
            <Input
              onChange={(e) => handleInputChange("street", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="States">
            <Select
              value={formData.states}
              onChange={(value) => handleInputChange("states", value)}
            >
              {states.map((state: any) => (
                <Select.Option key={state.abbreviation} value={state.name}>
                  {state.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Zip Code">
            <InputNumber
              onChange={(value) => handleInputChange("zipCode", value)}
            />
          </Form.Item>
        </fieldset>
        <Form.Item label="Department">
          <Select onChange={(value) => handleInputChange("department", value)}>
            <Select.Option value="sales">Sales</Select.Option>
            <Select.Option value="Marketing">Marketing</Select.Option>
            <Select.Option value="engineering">Engineering</Select.Option>
            <Select.Option value="human resources">
              Human Resources
            </Select.Option>
            <Select.Option value="legal">Legal</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="saveButton" onClick={handleSaveEmployee}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CustomForm
