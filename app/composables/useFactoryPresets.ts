export function getRelatedPresets(
  model: Partial<keyof Schema['data']['tone']> = 'THRGroupAmp',
  key: Partial<keyof THRGroupAmp> | Partial<keyof THRGroupCab> = '@asset',
  value: THRGroupAmp[Partial<keyof THRGroupAmp>] | THRGroupCab[Partial<keyof THRGroupCab>] = 'THR10C_Deluxe',
  factoryPresets: Schema[]
) {
  return (factoryPresets as Schema[])?.filter((preset: Schema) =>
    (preset.data.tone[model] as { [key: string]: THRGroupAmp[Partial<keyof THRGroupAmp>] | THRGroupCab[Partial<keyof THRGroupCab>] })[key] === value)
}

export function useFactoryPresets() {
  const { data: factoryPresets } = useAsyncData('factoryPresets', () => {
    return queryCollection('thrPresets')
      .select('data', 'meta', 'schema', 'version')
      .all()
  })
  return {
    factoryPresets,
    getRelatedPresets
  }
}
