import styled from "styled-components"
import { theme } from "../../theme"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import Hamburger from "hamburger-react"

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 35%;

  @media only screen and (max-width: 980px) {
    width: 0%;
  }
`

const NavLine = styled.div`
  background-color: black;
  width: 10px;
  position: relative;

  ::before {
    content: "";
    background-color: #fed330;
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
  font-size: ${theme.fontSizes[5]}rem;
  font-weight: 600;
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

const MobileContainer = styled(Container)`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #efd23b;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 30px;
  padding-left: 50px;
  z-index: 10;
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
    name: "Sortowanie babelkowe",
    nav: [
      {
        endpoint: "/sort/bubble/theory",
        value: "Teoria",
      },
      {
        endpoint: "/sort/bubble/visualization",
        value: "Wizualizacja",
      },
    ],
  },
  1: {
    id: 1,
    name: "Szybkie sortowanie",
    nav: [
      {
        endpoint: "/sort/quick/theory",
        value: "Teoria",
      },
      {
        endpoint: "/sort/quick/visualization",
        value: "Wizualizacja",
      },
    ],
  },
  2: {
    id: 2,
    name: "Sortowanie przez wstawianie",
    nav: [
      {
        endpoint: "/sort/insertion/theory",
        value: "Teoria",
      },
      {
        endpoint: "/sort/insertion/visualization",
        value: "Wizualizacja",
      },
    ],
  },
  3: {
    id: 3,
    name: "Sortowanie przez wybieranie",
    nav: [
      {
        endpoint: "/sort/selection/theory",
        value: "Teoria",
      },
      {
        endpoint: "/sort/selection/visualization",
        value: "Wizualizacja",
      },
    ],
  },
  4: {
    id: 4,
    name: "O projekcie",
    nav: [
      {
        endpoint: "/sort/about",
        value: "Informacje",
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
  const [isOpen, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<number>(0)
  const [cursor, setCursor] = useState<number>(0)
  const [windowDimensions, setWindowDimensions] = useState<any>(null)

  useEffect(() => {
    if (typeof window === `undefined`) return

    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })

  useEffect(() => {
    if (expanded === -1) setCursor(0)
  }, [expanded])

  return (
    <Wrapper>
      {windowDimensions && windowDimensions?.width < 980 ? (
        <>
          <Hamburger size={40} toggled={isOpen} toggle={setOpen} />
          {isOpen && (
            <MobileContainer>
              {Object.values(toc).map(it => (
                <Accordion
                  key={it.id}
                  content={it}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  setCursor={setCursor}
                />
              ))}
            </MobileContainer>
          )}
        </>
      ) : (
        <>
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
        </>
      )}
    </Wrapper>
  )
}

export default Navigate
