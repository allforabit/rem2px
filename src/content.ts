import { ChromeMessage, Sender } from './types'
import { convert } from './convert/convert'

type MessageResponse = (response?: any) => void

const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
) => {
  return sender.id === chrome.runtime.id && message.from === Sender.React
}

// https://stackoverflow.com/questions/5558613/replace-words-in-the-body-text
function replaceInText(element: ChildNode, replacement: string) {
  for (let node of element.childNodes) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        replaceInText(node, replacement)
        break
      case Node.TEXT_NODE:
        node.textContent = convert(node.textContent)
        break
      case Node.DOCUMENT_NODE:
        replaceInText(node, replacement)
    }
  }
}

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse,
) => {
  const isValidated = validateSender(message, sender)

  if (isValidated && message.message === 'Hello from React') {
    response('Hello from content.js')
  }

  if (isValidated && message.message === 'delete logo') {
    const x = document.body.childNodes
    replaceInText(document.body, 'hi')
    console.log('Replaced stuff')
  }
}

const main = () => {
  console.log('[content.ts] Main')
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
}

main()
