import { Form, Input, Button, DatePicker, Select, ConfigProvider } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { saveEmployee } from "../employee/actions"
import { AppDispatch } from "../../app/store"
import states from "./states"

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
  const [form] = useForm<FieldType>()
  const dispatch = useDispatch()
  const formState = useSelector((state: RootState) => state.Employees)

  const onFinish = (values: FieldType) => {
    const formData = {
      ...values,
      dateOfBirth: values.dateOfBirth.format("DD-MM-YYYY"),
      startDate: values["startDate"].format("DD-MM-YYYY"),
    }

    // Dispatch action pour mettre à jour l'état du formulaire dans Redux
    // dispatch(saveFormEmployee(formData))
    //dispatch(addEmployee(formData))
    dispatch(saveEmployee(formData))

    console.log("Success:", formData)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 20 }}
      style={{ minWidth: 300, maxWidth: 600 }}
      layout="vertical"
      initialValues={{
        states: "Alabama",
        department: "sales",
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
          <Select value={formState.states}>
            {states.map((state: any) => (
              <Select.Option key={state.abbreviation} value={state.name}>
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
          <Select.Option value="sales">Sales</Select.Option>
          <Select.Option value="Marketing">Marketing</Select.Option>
          <Select.Option value="engineering">Engineering</Select.Option>
          <Select.Option value="human resources">Human Resources</Select.Option>
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
  )
}
export default App
