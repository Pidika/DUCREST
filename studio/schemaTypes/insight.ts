import { defineArrayMember, defineField, defineType } from 'sanity';

const practiceAreas = [
  { title: 'Commercial Intellectual Property', value: 'commercial-intellectual-property' },
  { title: 'IP Litigation & Enforcement', value: 'ip-litigation-enforcement' },
  { title: 'Media & Entertainment', value: 'media-entertainment' },
  { title: 'Technology, Fintech & Data Protection', value: 'technology-fintech-data-protection' },
  { title: 'Web3 and Emerging Technologies', value: 'web3-emerging-technologies' },
  { title: 'Startups Advisory', value: 'startups-advisory' },
  { title: 'General Dispute Resolution & Litigation', value: 'general-dispute-resolution-litigation' },
  { title: 'Corporate Advisory & Compliance', value: 'corporate-advisory-compliance' },
];

const sectors = [
  { title: 'Media & Entertainment', value: 'media-entertainment' },
  { title: 'Digital Assets & Web 3', value: 'digital-assets-web3' },
  { title: 'Technology & Innovation', value: 'technology-innovation' },
  { title: 'Financial Services', value: 'financial-services' },
  { title: 'Consumer & Retail', value: 'consumer-retail' },
  { title: 'Fashion & Lifestyle', value: 'fashion-lifestyle' },
  { title: 'Real Estate & Construction', value: 'real-estate-construction' },
];

export const insightType = defineType({
  name: 'insight',
  title: 'News & Insight',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(120) }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Summary', type: 'text', rows: 4, validation: (rule) => rule.required().max(320) }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Thought Leadership', value: 'thought-leadership' }, { title: 'Legal Alerts', value: 'legal-alerts' }, { title: 'Events & Media', value: 'events-media' }], layout: 'radio' }, validation: (rule) => rule.required() }),
    defineField({ name: 'status', title: 'Publication status', type: 'string', initialValue: 'draft', options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }], layout: 'radio' }, validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Publication date', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'authorName', title: 'Guest author name', type: 'string', description: 'Use only when the author does not have a profile.' }),
    defineField({ name: 'mainImage', title: 'Featured image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required() })] }),
    defineField({ name: 'body', title: 'Article', type: 'array', of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading', value: 'h2' }, { title: 'Subheading', value: 'h3' }] })], validation: (rule) => rule.required() }),
    defineField({
      name: 'relatedPracticeAreas',
      title: 'Related practice areas',
      description: 'Select every practice area that applies to this article.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: practiceAreas, layout: 'grid' },
    }),
    defineField({
      name: 'relatedSectors',
      title: 'Related sectors',
      description: 'Select every sector that applies to this article.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: sectors, layout: 'grid' },
    }),
    defineField({ name: 'seo', title: 'Search settings', type: 'object', fields: [defineField({ name: 'title', title: 'SEO title', type: 'string', validation: (rule) => rule.max(60) }), defineField({ name: 'description', title: 'SEO description', type: 'text', rows: 3, validation: (rule) => rule.max(160) })] }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'mainImage' } },
  orderings: [{ title: 'Publication date', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
