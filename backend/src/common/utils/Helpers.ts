export default class Helpers {
  private constructor() {
    throw new Error('Helpers class cannot be instantiated.');
  }

  public static generateOrderByClauses(orderByParams: Array<string>): Array<string> {
    const orderByClauses: Array<string> = [];
    orderByParams.forEach(fieldWithDirection => {
      const [field, dir] = fieldWithDirection.split(':');
      const direction = dir === 'desc' ? 'desc' : 'asc';
      if (field) {
        orderByClauses.push(`${field} ${direction}`);
      }
    });
    return orderByClauses;
  }

  public static formatErrorMessage(errorMessage: string, replacements: Array<any>): string {
    return errorMessage.replace(/{\d+}/g, match => {
      const position = parseInt(match.match(/\d+/)[0], 10);
      return replacements[position] !== undefined ? replacements[position] : match;
    });
  }

  public static stringMatchesEnumValue(value: string, enumType: any): boolean {
    return Object.values(enumType).includes(value as any);
  }

  public static generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
