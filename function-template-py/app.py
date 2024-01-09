#!/usr/bin/env python3

import aws_cdk as cdk

from function_template_py.function_template_py_stack import FunctionTemplatePyStack


app = cdk.App()
FunctionTemplatePyStack(app, "FunctionTemplatePyStack")

app.synth()
