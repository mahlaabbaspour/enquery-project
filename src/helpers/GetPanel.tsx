const panelTitleMap: Record<string, string> = {
  admin: 'پنل مدیریت',
  user: 'پنل کاربری',
  institution: 'پنل مرکز',
  superUser: 'پنل سوپریوزر',
  organization: 'پنل سازمان'
}

export const getPanelTitleFromPath = (pathname: string): string => {
  const panelKey = Object.keys(panelTitleMap).find(key => pathname.startsWith(`/${key}`))

  return panelKey ? panelTitleMap[panelKey] : ''
}
