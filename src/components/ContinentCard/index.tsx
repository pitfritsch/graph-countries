import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '../Loading'

interface ContinentCard {
  code: string
  name: string
}

interface Country {
  name: string
  native: string
  phone: string
  capital: string
  currency: string
  languages: {
    name: string
  }[]
}

const GET_COUNTRIES = gql`
  query GetCountries($continentCode: String!) {
    countries(filter: {
      continent: {
        regex: $continentCode
      }
    }) {
      name
      native
      phone
      capital
      currency
      languages {
        name
      }
    }
  }
`

const Card = styled.div`
  border: 1px solid #a7a7a7;
  border-radius: 10px;
  margin: 10px 0;
  padding: 0 20px;
  cursor: pointer;
  box-shadow: 2px 2px 10px -5px black;
`

const Title = styled.h3`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
`

const CountryTitle = styled.h4`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
`

export default function ContinentCard({ code, name }: ContinentCard) {

  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ countries, setCountries ] = useState<Country[]>([])

  const [getCountries, { loading, error, data }] = useLazyQuery<{ countries: Country[] }>(GET_COUNTRIES, {
    variables: {
      continentCode: code
    }
  })

  function handleOpen() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
      getCountries()
    }
  }

  useEffect(() => {
    if (data) setCountries(data.countries)
  }, [data])

  return (
    <Card onClick={handleOpen}>
      <Loading isLoading={loading} size='25px'>
        <Title>
          {name}
        </Title>
        {isOpen && countries.map(country => 
          <CountryTitle>{country.name}</CountryTitle>
        )}
      </Loading>
    </Card>
  )
}
