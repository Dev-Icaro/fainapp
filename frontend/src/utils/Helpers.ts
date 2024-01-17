export default class Helpers {
  public static formatErrorMessage(errorMessage: string, replacements: Array<any>): string {
    return errorMessage.replace(/{\d+}/g, match => {
      const matchResult = match.match(/\d+/);
      if (matchResult) {
        const position = parseInt(matchResult[0], 10);
        return replacements[position] !== undefined ? replacements[position] : match;
      }
    });
  }
}
