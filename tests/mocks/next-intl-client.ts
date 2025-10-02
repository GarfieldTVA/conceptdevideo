export function useRouter() {
  return {
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    locale: 'fr'
  };
}

export function usePathname() {
  return '/fr';
}
