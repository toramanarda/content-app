import MainHeader from "@/components/main/header"
import GetStartedContainer from "@/components/get-started-container/get-started-cont"

export default function MainLayout({ children }) {
  return (
    <div className="container">
      <MainHeader />
      <hr />
      <GetStartedContainer />
      <hr />
      {children}
    </div>
  )
}