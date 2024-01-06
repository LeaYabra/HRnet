import "../designs/styles.css"
import Header from "../components/header"
import Employee from "../features/table/employee"
import Footer from "../components/footer"
function Home() {
  return (
    <div>
      <Header />
      <Employee />
      <Footer />
    </div>
  )
}

export default Home
