import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContinentCard from '../components/ContinentCard'
import Loading from '../components/Loading'

const GET_ALL_CONTINENTS = gql`
  query AllContinents {
    continents {
      code
      name
    }
  }
`

interface Continents {
  code: string
  name: string
}

const Container = styled.div`
  padding: 50px 10px;
  max-width: 1000px;
  margin: auto;
`

const Title = styled.h1`
  font-family: 'Vollkorn', serif;
`

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<{ continents: Continents[] }>(GET_ALL_CONTINENTS)

  const [ continents, setContinents ] = useState<Continents[]>([])

  useEffect(() => {
    if (data) setContinents(data.continents)
  }, [data])

  return (
    <Loading isLoading={loading}>
      <Container>
        <Title>Continents</Title>
        {continents.map(continent => 
          <ContinentCard
            key={continent.code}
            code={continent.code}
            name={continent.name}
          />
        )}
      </Container>
    </Loading>
  )
}

export default Home
