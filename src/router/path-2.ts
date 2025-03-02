const paths2 = {
	root: '/',
	about: '/about',
	pricing: '/pricing',
	auth: {
		login: '/auth/login',
		register: '/auth/register',
	},
	candidate: {
		root: '/candidate',
		tests: {
			root: '/candidate/tests',
			in(id: string = ":testId") {
				return {
					root: `/candidate/tests/${id}`,
					attempts: `/candidate/tests/${id}/attempts`,
					do: `/candidate/tests/${id}/do`,
				}
			},
			attempts: {
				root: '/candidate/attempts',
				in(id: string = ":attemptId") {
					return {
						root: `/candidate/attempts/${id}`,
						evaluation: `/candidate/attempts/${id}/evaluation`,
						suggestions: `/candidate/attempts/${id}/suggestions`,
					}
				}
			}
		},
	}
}

export default paths2;