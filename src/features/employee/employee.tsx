import React, { useEffect, useState, useCallback } from "react"
import { Table } from "antd"
import { useSelector } from "react-redux"
import { Employee } from "./reducer"
import { selectEmployees } from "./selector"
import type { ColumnsType, TablePaginationConfig } from "antd/lib/table"
import { Input } from "antd"
import type { TableProps } from "antd/lib/table"

// Définition des colonnes du tableau
const columns: ColumnsType<Employee> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    sorter: true,
    width: "11%",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    sorter: true,
    width: "11%",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    sorter: true,
    width: "11%",
  },
  {
    title: "Department",
    dataIndex: "department",
    sorter: true,
    width: "13%",
  },
  {
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
    sorter: true,
    width: "13%",
  },
  {
    title: "Street",
    dataIndex: "street",
    sorter: true,
    width: "15%",
  },
  {
    title: "City",
    dataIndex: "city",
    sorter: true,
    width: "13%",
  },
  {
    title: "States",
    dataIndex: "states",
    sorter: true,
    width: "2%",
  },
  {
    title: "Zip Code",
    dataIndex: "zipCode",
    sorter: true,
    width: "12%",
  },
]

const EmployeeTable: React.FC = () => {
  // Récupération de la liste des employés depuis le store Redux
  const employees: Employee[] = useSelector(selectEmployees)

  // États locaux
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: employees.length,
  })
  const [data, setData] = useState<Employee[]>([])
  const [searchText, setSearchText] = useState("")

  // Fonction pour récupérer les données avec le filtre de recherche
  // useCallback pour mémoriser fetchData
  const fetchData = useCallback(() => {
    setLoading(true)

    // Appliquer les filtres aux données
    const filteredData = searchText
      ? employees.filter((employee) =>
          Object.values(employee).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchText.toLowerCase()),
          ),
        )
      : employees

    setData(filteredData)

    // Définir la valeur totale correcte en fonction des données filtrées
    setTableParams((prevParams) => ({
      ...prevParams,
      total: filteredData.length,
    }))

    // Indiquer que le chargement est terminé
    setLoading(false)
  }, [searchText, employees])

  useEffect(() => {
    fetchData()
  }, [fetchData, tableParams.pageSize, employees])

  // Fonction pour gérer les changements dans le tableau
  const handleTableChange: TableProps<Employee>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    // Log des informations de tri
    console.log("Sorter:", sorter)

    // Mise à jour des paramètres de pagination
    if (pagination.pageSize !== tableParams.pageSize) {
      setTableParams({
        ...pagination,
      })
      setData([])
    } else {
      setTableParams({
        ...pagination,
      })
    }

    // Applique les filtres aux données
    const filteredData = Object.keys(filters).reduce((result, key) => {
      const values = filters[key] as (string | number | Date | null)[]
      if (values.length > 0) {
        return result.filter((item) => {
          const itemValue = item[key as keyof Employee]
          return (
            values.includes(itemValue) ||
            (itemValue === null && values.includes(null))
          )
        })
      }
      return result
    }, employees)

    console.log("Données filtrées :", filteredData)
    setData(filteredData.reverse())
  }

  return (
    <div className="mobile-table">
      <Input.Search
        className="ant-input-search"
        placeholder="Rechercher"
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Table
        columns={columns}
        rowKey={(record) => `${record.firstName}-${record.lastName}`}
        dataSource={data}
        pagination={{
          ...tableParams,
          showTotal: (total, range) => (
            <span className="showing">
              {`Showing ${range[0]} to ${range[1]} of ${total} entries`}
            </span>
          ),
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default EmployeeTable
