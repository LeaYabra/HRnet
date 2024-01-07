import React from "react"
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd"

const CustomForm: React.FC = () => {
  return (
    <>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        style={{ minWidth: 300, maxWidth: 600 }}
      >
        <Form.Item label="FirstName">
          <Input />
        </Form.Item>
        <Form.Item label="LastName">
          <Input />
        </Form.Item>
        <Form.Item label="Date of Birth">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Start Date">
          <DatePicker />
        </Form.Item>
        <fieldset name="address">
          <legend>Address</legend>
          <Form.Item label="Street">
            <Input />
          </Form.Item>
          <Form.Item label="City">
            <Input />
          </Form.Item>
          <Form.Item label="State">
            <Select>
              <Select.Option value="sales">Sales</Select.Option>
              <Select.Option value="Marketing">Marketing</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Zip Code">
            <InputNumber />
          </Form.Item>
        </fieldset>
        <Form.Item label="Department">
          <Select>
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
          <Button className="saveButton">Save</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CustomForm
