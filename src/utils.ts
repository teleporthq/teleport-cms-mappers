import { ContentfulWebhookResponse } from './types'

/*
  This is used to resolve the dynamic route expressions like:
  /blog/${slug}
  /blog/${slug}/${id}
  /${user.type}/${user.name}/album/${user.albums[0].title}

  to simple strings with the values resolve like
  /blog/my-first-post
  /blog/my-first-post/1
  /user/john/album/my-first-album

  Each CMS webhook response has it's own response structure and we need to map the dynamic route.
*/

export const resolveDynamicAttributeToPath = (
  str: string,
  data: Record<string, unknown>
): string => {
  return str.replace(/\$\{([^}]+)\}/g, (match, key) => {
    const keys = key.split('.').map((k) => k.replace(/\[(\d+)\]/g, '.$1').split('.'))
    let value: any = data

    for (const keyArray of keys) {
      for (const k of keyArray) {
        if (typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return match
        }
      }
    }

    return value !== undefined ? value : match
  })
}

export const resolveDynamicAttributeToPathForContentful = (
  str: string,
  data: ContentfulWebhookResponse,
  language?: string
): string => {
  return str.replace(/\$\{([^}]+)\}/g, (match, key) => {
    const keys = key.split('.').map((k) => k.replace(/\[(\d+)\]/g, '.$1').split('.'))
    let value: any = { ...data.fields, ...data.sys } // Allow resolving placeholders directly from data.sys as well

    for (const keyArray of keys) {
      for (const k of keyArray) {
        if (typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return match // Return the original placeholder if the key is not found in the data object
        }
      }
    }

    // Check if language key is provided and use it if found
    if (language && value && typeof value === 'object' && language in value) {
      return value[language]
    }

    // Use the 'en-US' field if language is not provided or not found
    if (value && typeof value === 'object' && 'en-US' in value) {
      return value['en-US']
    }

    // If the value is a string, return it
    if (typeof value === 'string') {
      return value
    }

    return match
  })
}
