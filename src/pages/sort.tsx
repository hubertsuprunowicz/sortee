import React from "react"
import { Router } from "@reach/router"
import { Layout } from "../compontents/Layout"
import BubbleSort from "../templates/bubble"
import QuickPage from "../templates/quick"
import { Link } from "gatsby"
import { render } from "react-dom"
import BubbleTheory from "../templates/bubble-theory"
import QuickSort from "../templates/quick"
import InsertionSort from "../templates/insertion"
import InsertionTheory from "../templates/insertion-theory"
import QuickTheory from "../templates/quick-theory"
import SelectionTheory from "../templates/selection-theory"
import SelectionSort from "../templates/selection"

const Default: any = () => (
  <div>
    <h2>Default</h2>
  </div>
)

const App = () => {
  return (
    <Layout>
      <Router basepath="/sort">
        <BubbleTheory path="/bubble/theory" />
        <BubbleSort path="/bubble/visualization" />
        <QuickTheory path="/quick/theory" />
        <QuickSort path="/quick/visualization" />
        <InsertionTheory path="/insertion/theory" />
        <InsertionSort path="/insertion/visualization" />
        <SelectionTheory path="/selection/theory" />
        <SelectionSort path="/selection/visualization" />
        <Default path="/sort" />
      </Router>
    </Layout>
  )
}

export default App
