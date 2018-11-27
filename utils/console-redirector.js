
const _log = console.log
const _warn = console.warn
const _error = console.error

const redirectConsoleToFunctions = (logFun, warnFun, errorFun) => {
  console.log = logFun
  console.warn = warnFun
  console.error = errorFun
}

const restoreConsoleFunctions = () => {
  console.log = _log
  console.warn = _warn
  console.error = _error
}

exports.redirectConsoleToFunctions = redirectConsoleToFunctions
exports.restoreConsoleFunctions = restoreConsoleFunctions
