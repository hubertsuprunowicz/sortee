import styled from "styled-components"
import { theme } from "../../theme"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const NavLine = styled.div`
  background-color: black;
  width: 10px;
  position: relative;

  ::before {
    content: "";
    background-color: #e8c50d;
    display: block;
    width: 8px;
    height: 100%;
    right: 100px;
    margin-left: -2px;
    margin-top: -3px;
  }
`

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: ${theme.fontSizes[7]}rem;
  list-style-type: none;

  ul {
    list-style-type: none;
  }

  li {
    padding-top: 25px;
    padding-bottom: 20px;

    li {
      padding-top: 5px;
      padding-bottom: 2px;
    }

    a {
      font-size: ${theme.fontSizes[5]}rem;
      color: inherit;
      text-decoration: inherit;
    }
  }
`

const Cursor = styled(motion.div)`
  content: "";
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  margin-left: -7px;
  border-radius: 50%;
  border: 3px solid black;
  background-color: #efd23b;
`
type NavContent = {
  id: number
  name: string
  nav: { endpoint: string; value: string }[]
}

type TableOfContent = { [key: string]: NavContent }

const toc: TableOfContent = {
  0: {
    id: 0,
    name: "Bubble sort",
    nav: [
      {
        endpoint: "/sort/bubble",
        value: "Theory",
      },
      {
        endpoint: "/sort/bubble",
        value: "Visualisation",
      },
    ],
  },
  1: {
    id: 1,
    name: "Quick sort",
    nav: [
      {
        endpoint: "/sort/quick",
        value: "Theory",
      },
      {
        endpoint: "/sort/quick",
        value: "Visualisation",
      },
    ],
  },
  2: {
    id: 2,
    name: "Insertion sort",
    nav: [
      {
        endpoint: "/sort/insertion",
        value: "Theory",
      },
      {
        endpoint: "/sort/insertion",
        value: "Visualisation",
      },
    ],
  },
  3: {
    id: 3,
    name: "Merge sort",
    nav: [
      {
        endpoint: "/sort/merge",
        value: "Theory",
      },
      {
        endpoint: "/sort/merge",
        value: "Visualisation",
      },
    ],
  },
  4: {
    id: 4,
    name: "About",
    nav: [
      {
        endpoint: "/sort/about",
        value: "TODO...",
      },
    ],
  },
}

const Accordion: React.FC<{
  content: NavContent
  expanded: number
  setExpanded: (arg: number) => any
  setCursor: (arg: number) => any
}> = ({ content, expanded, setExpanded, setCursor }) => {
  const [top, setTop] = useState(0)
  const refContainer = useRef<any>(this)
  const isOpen = content.id === expanded

  useEffect(() => {
    const itemTop = refContainer?.current?.getBoundingClientRect()?.top
    const height = refContainer?.current?.getBoundingClientRect()?.height
    setTop(content.id > 0 ? itemTop - height : itemTop)
  }, [])

  const handleClick = () => {
    setCursor(top)
    setExpanded(isOpen ? -1 : content.id)
  }

  return (
    <li ref={refContainer as any} style={{ cursor: "pointer" }}>
      <motion.header initial={false} onClick={handleClick}>
        {content.name}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {content.nav.map((it, index) => (
              <motion.li
                key={it.value}
                ref={refContainer as any}
                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                transition={{ ease: "easeOut", duration: 1 }}
                className="content-placeholder"
              >
                <Link
                  to={it.endpoint}
                  onClick={() => {
                    setCursor(top + (index + 1) * 40)
                  }}
                  activeClassName="active-link"
                >
                  {it.value}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

const Navigate = () => {
  const [expanded, setExpanded] = useState<number>(0)
  const [cursor, setCursor] = useState<number>(0)

  useEffect(() => {
    if (expanded === -1) setCursor(0)
  }, [expanded])

  return (
    <Wrapper>
      <NavLine>
        <Cursor animate={{ top: cursor }} />
      </NavLine>
      <Container>
        {Object.values(toc).map(it => (
          <Accordion
            key={it.id}
            content={it}
            expanded={expanded}
            setExpanded={setExpanded}
            setCursor={setCursor}
          />
        ))}
      </Container>
    </Wrapper>
  )
}

export default Navigate
