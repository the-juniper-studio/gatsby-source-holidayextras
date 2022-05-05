exports.locationCodes = (param) => {
  switch (param.slice(0, -1)) {
    case 'AB':
      return 'Aberdeen'
    case 'BH':
      return 'Belfast City (George Best)'
    case 'BF':
      return 'Belfast International'
    case 'BH':
      return 'Birmingham'
    case 'BO':
      return 'Bournemouth'
    case 'BR':
      return 'Bristol'
    case 'CW':
      return 'Cardiff'
    case 'DS':
      return 'Doncaster-Sheffield (Robin Hood)'
    case 'DU':
      return 'Dublin'
    case 'MM':
      return 'Durham Tees Valley'
    case 'EM':
      return 'East Midlands'
    case 'ED':
      return 'Edinburgh'
    case 'EX':
      return 'Exeter'
    case 'LG':
      return 'Gatwick'
    case 'GL':
      return 'Glasgow International'
    case 'PI':
      return 'Glasgow Prestwick'
    case 'LH':
      return 'Heathrow'
    case 'HU':
      return 'Humberside'
    case 'IN':
      return 'Inverness'
    case 'LB':
      return 'Leeds Bradford'
    case 'LP':
      return 'Liverpool'
    case 'LC':
      return 'London City'
    case 'LT':
      return 'Luton'
    case 'MA':
      return 'Manchester'
    case 'NC':
      return 'Newcastle'
    case 'NW':
      return 'Norwich'
    case 'SN':
      return 'Shannon'
    case 'SO':
      return 'Southampton'
    case 'SE':
      return 'Southend'
    case 'ST':
      return 'Stansted'
    case 'DO':
      return 'Dover Port'
    case 'SO':
      return 'Southampton Port'
    default:
      return null
  }
}
