#!/bin/sh

npm run test

if [ ${GENERATE_COVERAGE_REPORT} = true ]; then
  npm run code-coverage-report
fi