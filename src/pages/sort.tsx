import React from "react"
import { Router } from "@reach/router"
import { Layout } from "../compontents/Layout"
import BubbleSort from "../templates/bubble"
import QuickPage from "../templates/quick"
import { Link } from "gatsby"
import { render } from "react-dom"
import BubbleTheory from "../templates/bubble-theory"
import QuickSort from "../templates/quick"

const Default: any = () => (
  <div>
    <h2>Default</h2>
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
        <BubbleTheory path="/bubble/theory" />
        <BubbleSort path="/bubble/visualization" />
        <QuickSort path="/quick/theory" />
        <QuickSort path="/quick/visualization" />
        <InsertionSort path="/insertion" />
        <MergeSort path="/merge" />
        <Default path="/sort" />
      </Router>
    </Layout>
  )
}

export default App
