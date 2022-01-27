import * as React from 'react'
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { ChromeMessage, Sender } from './types'
import { getCurrentTabUId, getCurrentTabUrl } from './chrome-utils'

function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })
}

async function clickHandler() {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  // const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  //
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   func: setPageBackgroundColor,
  // })
  console.log('Clicked')
}

export const Home = () => {
  const [url, setUrl] = useState<string>('')
  const [responseFromContent, setResponseFromContent] = useState<string>('')

  /**
   * Get current URL
   */
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || 'undefined')
    })
  }, [])

  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'Hello from React',
    }

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
          setResponseFromContent(responseFromContentScript)
        })
    })
  }

  const sendRemoveMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'delete logo',
    }

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (response) => {
          setResponseFromContent(response)
        })
    })
  }

  return (
    <div className="p-3">
      <button
        className="rounded bg-black p-3 text-white"
        onClick={sendRemoveMessage}
      >
        Process
      </button>
    </div>
  )
}

const Example = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={clsx(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      >
        <span
          className={clsx(
            enabled
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <svg
            className="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={clsx(
            enabled
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <svg
            className="h-3 w-3 text-indigo-600"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  )
}

export function App() {
  return (
    <Home />
    // <h1 className="flex flex-col gap-4 bg-black p-3 text-white">
    //   <Example />
    //   <button
    //     onClick={() => {
    //       clickHandler()
    //     }}
    //   >
    //     Fire it!!!
    //   </button>
    // </h1>
  )
}
