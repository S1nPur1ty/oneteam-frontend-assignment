'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Issue } from '@/models/Issue.model'
import { tempUrl } from '@/constants/general.constant'

type IssuesContextType = {
  issues: Issue[]
  isLoading: boolean
  fetchIssues: () => Promise<void>
  url: string
  setUrl: (url: string) => void
}

const IssuesContext = createContext<IssuesContextType>({} as IssuesContextType)

const useIssues = () => {
  const [url, setUrl] = useState<string>(tempUrl)
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchIssues = useCallback( async () => {
    setLoading( true )
    try {
      const response = await fetch(url)
      if ( !response.ok )
        throw new Error( `HTTP error! status: ${response.status}` )

      const data = await response.json()
      setIssues( data )
    } catch ( err ) {
      console.error( 'An error occurred while fetching issues', err )
    } finally {
      setLoading( false )
    }
  }, [url])

  useEffect( () => { fetchIssues() }, [fetchIssues, url] )

  return { issues, isLoading, fetchIssues, url, setUrl }
}

const IssuesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const issuesState = useIssues()
  return <IssuesContext.Provider value={issuesState}>{children}</IssuesContext.Provider>
}

const useIssuesContext = () => {
  const context = useContext(IssuesContext)
  if ( context === undefined )
    throw new Error('useIssuesContext must be used within an IssuesProvider')
  
  return context
}

export { IssuesContext, IssuesProvider, useIssuesContext }