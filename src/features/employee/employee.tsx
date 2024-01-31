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
    title: "Prénom",
    dataIndex: "firstName",
    sorter: true,
    width: "11%",
  },
  {
    title: "Nom",
    dataIndex: "lastName",
    sorter: true,
    width: "11%",
  },
  {
    title: "Date de début",
    dataIndex: "startDate",
    sorter: true,
    width: "11%",
  },
  {
    title: "Département",
    dataIndex: "department",
    sorter: true,
    width: "13%",
  },
  {
    title: "Date de naissance",
    dataIndex: "dateOfBirth",
    sorter: true,
    width: "13%",
  },
  {
    title: "Rue",
    dataIndex: "street",
    sorter: true,
    width: "15%",
  },
  {
    title: "Ville",
    dataIndex: "city",
    sorter: true,
    width: "13%",
  },
  {
    title: "État",
    dataIndex: "states",
    sorter: true,
    width: "2%",
  },
  {
    title: "Code postal",
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
    total: 100,
  })
  const [data, setData] = useState<Employee[]>([])
  const [searchText, setSearchText] = useState("")

  // Fonction pour récupérer les données avec le filtre de recherche
  // useCallback pour mémoriser fetchData
  const fetchData = useCallback(() => {
    setLoading(true)

    // Applique les filtres aux données
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
    // Indique que le chargement est terminé
    setLoading(false)
  }, [searchText, employees])

  useEffect(() => {
    fetchData()
  }, [fetchData, tableParams])

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
    <div>
      <Input.Search
        style={{ marginBottom: 16, width: 200, float: "right" }}
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
            <span
              style={{
                color: "#22b934",
                fontWeight: "bold",
              }}
            >
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
