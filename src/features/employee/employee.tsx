import React, { useEffect, useState, useCallback } from "react"
import { Table, Input } from "antd"
import { useSelector } from "react-redux"
import { Employee } from "./reducer"
import { selectEmployees } from "./selector"
import type { ColumnsType, TablePaginationConfig } from "antd/lib/table"
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
    let filteredData = searchText
      ? employees.filter((employee) =>
          Object.values(employee).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchText.toLowerCase()),
          ),
        )
      : employees

    // Applique le tri aux données filtrées
    if (sorter && "order" in sorter) {
      const { order, field } = sorter

      filteredData = filteredData.sort((a, b) => {
        // Vérifie si 'field' est une clé valide de 'Employee'
        if (typeof field === "string" && field in a && field in b) {
          const valueA = a[field as keyof Employee]
          const valueB = b[field as keyof Employee]

          // Gère les cas où valueA ou valueB sont null
          if (valueA === null || valueB === null) {
            // Place les éléments null à la fin du tableau
            return valueA === null ? 1 : -1
          }

          // Vérifie le type de 'order' avant de comparer
          if (typeof order === "string") {
            // Compare les valeurs normalement si aucune n'est null
            if (order === "ascend") {
              return valueA > valueB ? 1 : -1
            } else {
              return valueA < valueB ? 1 : -1
            }
          }
        }

        // Gestion du cas où 'field' n'est pas une clé valide de 'Employee'
        return 0
      })
    }

    setData(filteredData)
  }

  return (
    <div className="table">
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
        scroll={{ x: true }}
      />
    </div>
  )
}

export default EmployeeTable
