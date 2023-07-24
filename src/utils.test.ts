import { describe, test, expect } from 'vitest'
import { resolveDynamicAttributeToPath, resolveDynamicAttributeToPathForContentful } from './utils'

describe('Test the URL resolution wtih dynamic expressions', () => {
  test('resolves the route with dynamic expressions', () => {
    const result = resolveDynamicAttributeToPath('/blog/${slug}', { slug: 'my-first-post' })
    expect(result).toBe('/blog/my-first-post')
  })

  test('resolves the route from nested objects', () => {
    const result = resolveDynamicAttributeToPath('/blog/${post.slug}', {
      post: { slug: 'my-first-post' },
    })
    expect(result).toBe('/blog/my-first-post')
  })

  test('resolves the route with multiple static and dynamic values', () => {
    const result = resolveDynamicAttributeToPath('/blog/${slug}/post/${id}', {
      slug: 'my-first-post',
      id: 1,
    })
    expect(result).toBe('/blog/my-first-post/post/1')
  })

  test('resolves the route with multiple static and dynamic nested values', () => {
    const result = resolveDynamicAttributeToPath('/blog/${slug}/post/${user.name}/details', {
      slug: 'my-first-post',
      user: {
        name: 'test-user',
      },
    })
    expect(result).toBe('/blog/my-first-post/post/test-user/details')
  })
})

describe('resolves the route for contentful responses', () => {
  test('resolves the string values from contentul id', () => {
    const result = resolveDynamicAttributeToPathForContentful('/slug/${id}', {
      sys: {
        id: 'my-first-post',
        type: 'blog',
        contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'id' } },
      },
      fields: {},
    })

    console.log(result)
  })
})
