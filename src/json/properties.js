export const properties = {
	pages: {
		webTerminal: {
			main: {
				font: {color: '#126466'},
				backgroundColor: '#f8f9fa',

				navigation: {
					backgroundColor: 'ffffff',
					border: {color: '#e3e5e5'},

					addButton: {
						font: {color: '#959ea1'},
						backgroundColor: '#fff',
						border: {color: '#e3e5e5'},
						hover: {
							font: {color: '#556367'},
							backgroundColor: '#f8f9fa',
							border: {color: '#c2c2c2'},
						},
					},

					tab: {
						normalStyle: {
							font: {color: '#212121'},
							border: {color: '#ffffff'},
						},
						selectedStyle: {
							font: {color: '#178082'},
							border: {color: '#178082'},
						},
					},

					items: {
						normalStyle: {
							backgroundColor: '#ffffff',
							border: {color: '#ffffff'},
						},
						selectedStyle: {
							backgroundColor: '#e4f3f4',
							border: {color: '#4ca6a8'},
						},
					},
				},

				tab: {
					backgroundColor: '#f0f3f6',
					normalItems: {
						backgroundColor: '#f0f3f6',
						font: {color: '#212121'},
						border: {color: '#f0f3f6'},
					},
					selectedItems: {
						backgroundColor: '#ffffff',
						font: {color: '#178082'},
						border: {color: '#178082'},
					},
				},

				aside: {
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
				},

				panels: {
					header: {
						normalStyle: {
							backgroundColor: '#ffffff',
							border: {color: '#e3e5e5'},
						},
						selectedStyle: {
							backgroundColor: '#e4f3f4',
							border: {
								color: 'rgba(23, 128, 130, 0.4)',
							},
						},
					},
					toolBar: {
						backgroundColor: '#ffffff',
						border: {color: '#e3e5e5'},
					},
					ssh: {
						terminal: {
							font: {color: '#212121'},
							backgroundColor: '#f8f9fa',
							selection: {color: '#182530'},
						},
						searchBox: {
							backgroundColor: '#ffffff',
							textBoxs: {
								font: {color: '#212121'},
							},
						},
						snippetsManager: {
							list: {
								normalStyle: {
									backgroundColor: '#f8f9fa',
									border: {color: '#f8f9fa'},
								},
								selectedStyle: {
									backgroundColor: '#ffffff',
									border: {color: '#178082'},
								},
							},
						},

						autoComplete: {
							font: {color: '#212121'},
							backgroundColor: '#ffffff',
							border: {color: '#f8f9fa'},
							boxShadow: {color: 'rgba(0, 0, 0, 0.19)'},
							items: {
								normalStyle: {
									backgroundColor: '#ffffff',
								},
								selectedStyle: {
									backgroundColor: 'rgba(0, 0, 0, 0.04)',
								},
							},
						},
					},
					sftp: {
						backgroundColor: '#ffffff',
						font: {color: '#212121'},
						border: {color: '#e3e5e5'},

						files: {
							selectedBackgroundColor: '#f8f9fa',
							prevPathBackgroundColor: 'rgba(228, 243, 244, 0.7)',
						},

						history: {
							backgroundColor: '#ffffff',
							border: {color: '#e3e5e5'},

							texts: {
								normalStyle: {
									font: {color: '#212121'},
								},
								description: {
									font: {color: '#959ea1'},
								},
								size: {
									font: {color: '#757575'},
								},
							},

							icons: {
								pause: {
									font: {color: '#a8a8a8'},
								},
								upload: {
									font: {color: '#4285f4'},
								},
								download: {
									font: {color: '#4ca6a8'},
								},
								edit: {
									font: {color: '#E4E723'},
								},
								delete: {
									font: {color: '#d45959'},
								},
							},

							items: {
								normalStyle: {
									backgroundColor: '#ffffff',
									border: {color: '#e3e5e5'},
								},
								selectedStyle: {
									backgroundColor: '#e4f3f4',
									border: {color: '#e3e5e5'},
								},
								progressBar: {
									font: {color: '#4ca6a8'},
								},
							},
						},
						edit: {
							textAreas: {
								font: {
									color: '#212121',
								},
								backgroundColor: '#f0f3f6',
							},
						},
					},
				},
			},

			setting: {
				header: {
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
				},

				navigation: {
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
					items: {
						normalStyle: {
							backgroundColor: '#ffffff',
							border: {color: '#ffffff'},
						},
						selectedStyle: {
							backgroundColor: '#e4f3f4',
							border: {color: '#4ca6a8'},
						},
					},
				},

				content: {
					normalStyle: {
						font: {color: '#212121'},
						backgroundColor: '#f8f9fa',
						title: {
							border: {color: '#e3e5e5'},
						},
					},
					identitiesPageStyle: {
						items: {
							normalStyle: {
								backgroundColor: '#ffffff',
								border: {color: '#e3e5e5'},

								resourceTableSelectedStyle: {
									backgroundColor: '#f8f9fa',
								},
								accountTableSelectedStyle: {
									backgroundColor: 'rgba(228, 243, 244, 0.7)',
								},
							},
						},
					},
				},
			},
		},

		signIn: {
			font: {color: '#212121'},
			backgroundColor: '#ffffff',

			links: {
				primary: {
					font: {color: '#178082'},
				},
				secondary: {
					font: {color: '#757575'},
				},
			},

			horizontalLine: {
				font: {color: '#c2c2c2'},
			},

			textBoxs: {
				placeholder: {
					color: '#757575',
				},
				icon: {
					color: '#757575',
				},
				normalStyle: {
					font: {color: '#212121'},
					backgroundColor: '#ffffff',
					border: {color: '#c2c2c2'},
				},
				selectedStyle: {
					font: {color: '#212121'},
					backgroundColor: '#ffffff',
					border: {color: '#178082'},
				},
			},
		},

		default: {
			footer: {
				font: {
					color: '#212121',
				},
				backgroundColor: '#dee1e6',
				iconButtons: {
					font: {
						color: '#757575',
					},
					hover: {
						font: {
							color: '#212121',
						},
					},
				},
			},
		},
	},

	basic: {
		default: {
			font: {color: '#212121'},
			border: {color: '#e3e5e5'},
		},

		pages: {
			buttons: {
				normalStyle: {
					normalStyle: {
						font: {color: '#ffffff'},
						backgroundColor: '#178082',
						hover: {backgroundColor: '#389193'},
						active: {backgroundColor: '#0a6f71'},
					},
					warningStyle: {
						font: {color: '#ffffff'},
						backgroundColor: '#d45959',
						hover: {backgroundColor: '#de6565'},
						active: {backgroundColor: '#b84646'},
					},
					transparentStyle: {
						font: {color: '#556367'},
						border: {color: '#c2c2c2'},
						hover: {
							backgroundColor: '#f8f9fa',
							border: {color: '#c2c2c2'},
						},
						active: {
							backgroundColor: '#f8f9fa',
							border: {color: '#a8a8a8'},
						},
					},
					disabledStyle: {
						font: {color: '#ffffff'},
						backgroundColor: '#e7e9ea',
					},
				},
				borderStyle: {
					normalStyle: {
						font: {color: '#178082'},
						border: {color: '#178082'},
						hover: {
							font: {color: '#389193'},
							backgroundColor: 'transparent',
							border: {color: '#389193'},
						},
						active: {
							font: {color: '#0a6f71'},
							backgroundColor: 'transparent',
							border: {color: '#0a6f71'},
						},
					},

					warningStyle: {
						font: {color: '#d45959'},
						border: {color: '#d45959'},
						hover: {
							font: {color: '#de6565'},
							backgroundColor: 'transparent',
							border: {color: '#de6565'},
						},
						active: {
							font: {color: '#b84646'},
							backgroundColor: 'transparent',
							border: {color: '#b84646'},
						},
					},

					transparentStyle: {
						font: {color: '#556367'},
						hover: {
							backgroundColor: '#f8f9fa',
						},
						active: {
							backgroundColor: '#f8f9fa',
						},
					},

					disabledStyle: {
						font: {color: '#c2c2c2'},
						backgroundColor: 'transparent',
						border: {color: '#e7e9ea'},
					},

					transparentDisabledStyle: {
						font: {color: '#c2c2c2'},
						backgroundColor: 'transparent',
					},
				},
			},
			checkBoxs: {
				normalStyle: {
					check: {
						font: {color: '#178082'},
					},
					default: {
						font: {color: '#757575'},
					},
				},
			},
			contextMenus: {
				normalStyle: {
					backgroundColor: '#ffffff',
					font: {color: '#212121'},
					border: {color: 'rgba(0, 0, 0, 0.19)'},
					selected: {
						backgroundColor: 'rgba(0, 0, 0, 0.04)',
					},
				},
			},
			dialogBoxs: {
				normalStyle: {
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
					boxShadow: {
						color: 'rgba(0, 0, 0, 0.22)',
					},
					subBlock: {
						backgroundColor: '#f8f9fa',
					},
				},
			},
			panels: {
				normalStyle: {
					font: {color: '#212121'},
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
				},
			},
			icons: {
				dynamicIcons: {
					normal: {
						normalStyle: {
							font: {color: '#959ea1'},
						},
						confirmStyle: {
							font: {color: '#178082'},
						},
						warningStyle: {
							font: {color: '#d45959'},
						},
						fontColorStyle: {
							font: {color: '#212121'},
						},
					},
					hover: {font: {color: '#556367'}},
					selected: {font: {color: '#178082'}},
				},
				imageIcons: {},
			},
			textBoxs: {
				normalStyle: {
					font: {color: '#212121'},
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
					focused: {
						border: {color: '#4ca6a8'},
					},
					invalid: {
						border: {
							color: '#d45959',
						},
					},
				},

				searchStyle: {
					font: {color: '#212121'},
					backgroundColor: '#f0f3f6',
					border: {
						color: 'transparent',
					},
				},
			},
			textAreas: {
				normalStyle: {
					font: {color: '#212121'},
					backgroundColor: '#ffffff',
					border: {color: '#e3e5e5'},
					focused: {border: {color: '#4ca6a8'}},
				},
			},
			radios: {
				normalStyle: {
					check: {
						font: {color: '#178082'},
					},
					default: {
						font: {color: '#757575'},
					},
				},
			},
			comboBoxs: {
				control: {
					font: {color: '#212121'},
					border: {color: '#e3e5e5'},
					backgroundColor: '#ffffff',
					focused: {border: {color: '#4ca6a8'}},
				},

				menuList: {
					backgroundColor: {
						normalStyle: '#ffffff',
						dialogStyle: '#ffffff',
					},
				},

				options: {
					font: {color: '#212121'},
					backgroundColor: {
						normalStyle: '#ffffff',
						dialogStyle: '#ffffff',
					},
					disabled: {
						font: {color: '#a8a8a8'},
						backgroundColor: '#ffffff',
					},
					selected: {
						backgroundColor: 'rgba(0, 0, 0, 0.04)',
					},
					focused: {
						backgroundColor: 'rgba(0, 0, 0, 0.04)',
					},
					hover: {
						backgroundColor: 'rgba(228, 243, 244, 0.7)',
					},
				},
			},
		},
	},
};
