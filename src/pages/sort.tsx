import React from "react"
import { Router } from "@reach/router"
import { Layout } from "../compontents/Layout"
import BubbleSort from "../templates/bubble"
import QuickPage from "../templates/quick"
import { Link } from "gatsby"
import { render } from "react-dom"

const Default: any = () => (
  <div>
    <h2>Default</h2>
  </div>
)

const QuickSort: any = () => (
  <div>
    <h2>QuickSort</h2>
  </div>
)

const InsertionSort: any = () => (
  <div>
    <h2>InsertionSort</h2>
  </div>
)

const MergeSort: any = () => (
  <div>
    <h2>MergeSort</h2>
  </div>
)

const App = () => {
  return (
    <Layout>
      <Router basepath="/sort">
        <BubbleSort path="/bubble" />
        <QuickSort path="/quick" />
        <InsertionSort path="/insertion" />
        <MergeSort path="/merge" />
        <Default path="/sort" />
      </Router>
    </Layout>
  )
}

// render(<App />, document.getElementById("root"))
export default App
