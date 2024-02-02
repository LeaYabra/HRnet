import "../designs/styles.css"
import Header from "../components/header"
import ListEmployee from "../components/employeeList"
import Footer from "../components/footer"

function Home() {
  return (
    <div>
      <Header />
      <ListEmployee />
      <Footer />
    </div>
  )
}

export default Home
