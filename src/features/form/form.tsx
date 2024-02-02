import { Form, Input, Button, DatePicker, Select, ConfigProvider } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useDispatch } from "react-redux"
import { saveEmployee } from "../employee/actions"
import states from "./states"
import { useState } from "react"
import MyModal from "../../components/modal/modal"

type FieldType = {
  firstName: string
  lastName: string
  dateOfBirth: any
  startDate: any
  street: string
  city: string
  states: string
  zipCode: number
  department: string
}

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleSaveClick = () => {
    // Affiche la modale au clic sur le bouton "Save"
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    // Ferme la modale
    setIsModalVisible(false)
    form.resetFields()
  }

  const [form] = useForm<FieldType>()
  const dispatch = useDispatch()

  const onFinish = async (values: FieldType) => {
    try {
      // Validation du formulaire
      await form.validateFields()
      const stateAbbreviation =
        states.find((state) => state.name === values.states)?.abbreviation ||
        values.states

      const formData = {
        ...values,
        states: stateAbbreviation,
        dateOfBirth: values.dateOfBirth.format("DD-MM-YYYY"),
        startDate: values["startDate"].format("DD-MM-YYYY"),
      }

      // Dispatch action pour sauvegarder les données de l'employé
      dispatch(saveEmployee(formData))
      console.log("Success:", formData)

      handleSaveClick()
      setIsModalVisible(true)
    } catch (error) {
      // Gère les erreurs de validation du formulaire
      console.error("Form validation failed:", error)
      setIsModalVisible(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ minWidth: 300, maxWidth: 600 }}
        layout="vertical"
        initialValues={{
          states: "Alabama",
          abbreviation: "AL",
          department: "Sales",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your First Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your Last Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Date of Birth"
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please input your Date of Birth!" },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please input your Start Date!" }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <fieldset name="address">
          <legend>Address</legend>
          <Form.Item<FieldType>
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please input your Street!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your City!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="States" name="states">
            <Select>
              {states.map((state: any) => (
                <Select.Option
                  key={state.abbreviation}
                  value={state.abbreviation}
                >
                  {state.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Zip Code"
            name="zipCode"
            rules={[{ required: true, message: "Please input your Zip Code!" }]}
          >
            <Input />
          </Form.Item>
        </fieldset>
        <Form.Item<FieldType> label="Department" name="department">
          <Select>
            <Select.Option value="Sales">Sales</Select.Option>
            <Select.Option value="Marketing">Marketing</Select.Option>
            <Select.Option value="Engineering">Engineering</Select.Option>
            <Select.Option value="Human resources">
              Human Resources
            </Select.Option>
            <Select.Option value="legal">Legal</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <ConfigProvider
            theme={{
              token: {
                colorBgTextHover: "#FFFF",
              },
            }}
          >
            <Button
              htmlType="submit"
              className="saveButton"
              style={{ color: "#FFFF" }}
            >
              Save
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
      {isModalVisible && (
        <MyModal visible={isModalVisible} onClose={handleCloseModal} />
      )}
    </>
  )
}
export default App
