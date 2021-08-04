export const themeValues = {
	light: {
		pages: {
			webTerminal: {
				main: {
					navigation: {
						backgroundColor: 'ffffff',
						border: {color: '#e3e5e5'},

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
							},
							searchBox: {
								backgroundColor: '#ffffff',
								textBoxs: {
									font: {color: '#212121'},
								},
							},
						},
						sftp: {
							backgroundColor: '#ffffff',
							font: {color: '#212121'},
							border: {color: '#e3e5e5'},

							files: {
								normalList: {
									normalStyle: {
										tr: {
											backgroundColor: '#ffffff',
											font: {
												color: '#212121',
											},
											border: {
												color: '#e3e5e5',
											},
										},
										item: {
											font: {color: '#212121'},
										},
									},
									selectedStyle: {
										tr: {
											backgroundColor: '#f8f9fa',
											font: {
												color: '#212121',
											},
											border: {
												color: '#e3e5e5',
											},
										},
										item: {
											font: {color: '#212121'},
										},
									},
								},
								dropList: {
									normalStyle: {
										item: {
											font: {
												color: '#212121',
											},
											backgroundColor: '#ffffff',
										},
									},
									currentSelectedStyle: {
										item: {
											font: {
												color: '#212121',
											},
											backgroundColor: '#f8f9fa',
										},
									},
									selectedStyle: {
										item: {
											font: {
												color: '#212121',
											},
											backgroundColor:
												'rgba(228, 243, 244, 0.7)',
										},
									},
								},
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
								font: {
									color: '#212121',
								},
								backgroundColor: '#ffffff',
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
						font: {color: '#212121'},
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
										backgroundColor:
											'rgba(228, 243, 244, 0.7)',
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
						font: {color: '#212121'},
						backgroundColor: '#ffffff',
						border: {color: '#e3e5e5'},
						boxShadow: {
							color: 'rgba(0, 0, 0, 0.22)',
						},
						subBlock: {
							backgroundColor: '#f8f9fa',
							selected: {
								backgroundColor: '#ffffff',
								border: {color: '#178082'},
							},
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
							color: 'none',
						},
					},
				},
				textAreass: {
					normalStyle: {
						font: {color: '#212121'},
						backgroundColor: '#ffffff',
						border: {color: '#e3e5e5'},
						focused: {border: {color: '#4ca6a8'}},
					},

					dialogBoxStyle: {
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
					normalStyle: {
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
								backgroundColor: null,
							},
							selected: {
								backgroundColor: 'rgba(0, 0, 0, 0.04)',
							},
							focused: {
								backgroundColor: 'rgba(0, 0, 0, 0.04)',
							},
						},
					},
				},
			},
		},
	},

	dark: {
		pages: {
			webTerminal: {
				main: {
					navigation: {
						backgroundColor: '#1e364c',
						border: {color: 'rgba(0, 0, 0, 0.3)'},

						tab: {
							normalStyle: {
								font: {
									color: 'rgba(255,255,255,0.87)',
								},
								border: {color: '#1e364c'},
							},
							selectedStyle: {
								font: {color: '#44c8c0'},
								border: {color: '#44c8c0'},
							},
						},

						items: {
							normalStyle: {
								backgroundColor: '#1e364c',
								border: {color: '#1e364c'},
							},
							selectedStyle: {
								backgroundColor: 'rgba(0,0,0,0.22)',
								border: {color: '#44c8c0'},
							},
						},
					},

					tab: {
						backgroundColor: '#223b52',
						normalItems: {
							backgroundColor: '#223b52',
							font: {color: 'rgba(255,255,255,0.87)'},
							border: {color: '#223b52'},
						},
						selectedItems: {
							backgroundColor: '#1b2935',
							font: {color: '#44c8c0'},
							border: {color: '#44c8c0'},
						},
					},

					aside: {
						backgroundColor: '#1c3246',
						border: {color: 'rgba(0, 0, 0, 0.3)'},
					},

					panels: {
						header: {
							normalStyle: {
								backgroundColor: '#1b2935',
								border: {
									color: 'rgba(0, 0, 0, 0.3)',
								},
							},
							selectedStyle: {
								backgroundColor: '#1f323c',
								border: {
									color: 'rgba(68, 200, 192, 0.5)',
								},
							},
						},
						toolBar: {
							backgroundColor: '#1b2935',
							border: {color: 'rgba(0, 0, 0, 0.3)'},
						},
						ssh: {
							terminal: {
								font: {
									color: 'rgba(255,255,255,0.87)',
								},
								backgroundColor: '#182530',
							},
							searchBox: {
								backgroundColor: '#253545',
								textBoxs: {
									font: {
										color: 'rgba(255,255,255,0.87)',
									},
								},
							},
						},
						sftp: {
							backgroundColor: '#1b2935',
							font: {
								color: 'rgba(255, 255, 255, 0.87)',
							},
							border: {color: 'rgba(0, 0, 0, 0.3)'},

							files: {
								normalList: {
									normalStyle: {
										tr: {
											backgroundColor: '#1b2935',
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
											border: {
												color: 'rgba(0, 0, 0, 0.3)',
											},
										},
										item: {
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
										},
									},
									selectedStyle: {
										tr: {
											backgroundColor:
												'rgba(0, 0, 0, 0.12)',
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
											border: {
												color: 'rgba(0, 0, 0, 0.3)',
											},
										},
										item: {
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
										},
									},
								},
								dropList: {
									normalStyle: {
										item: {
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
											backgroundColor: '#1b2935',
										},
									},
									currentSelectedStyle: {
										item: {
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
											backgroundColor:
												'rgba(0, 0, 0, 0.12)',
										},
									},
									selectedStyle: {
										item: {
											font: {
												color: 'rgba(255, 255, 255, 0.87)',
											},
											backgroundColor: '#1f323c',
										},
									},
								},
							},

							history: {
								backgroundColor: '#1b2935',
								border: {
									color: 'rgba(0, 0, 0, 0.3)',
								},

								texts: {
									normalStyle: {
										font: {
											color: 'rgba(255, 255, 255, 0.87)',
										},
									},
									description: {
										font: {
											color: 'rgba(255, 255, 255, 0.6)',
										},
									},
									size: {
										font: {
											color: 'rgba(255, 255, 255, 0.6)',
										},
									},
								},

								icons: {
									pause: {
										font: {
											color: 'rgba(255, 255, 255, 0.38)',
										},
									},
									upload: {
										font: {color: '#5e9aff'},
									},
									download: {
										font: {color: '#44c8c0'},
									},
									edit: {
										font: {color: '#E4E723'},
									},
									delete: {
										font: {color: '#de6565'},
									},
								},

								items: {
									normalStyle: {
										backgroundColor: '#1b2935',
										border: {
											color: ' rgba(0, 0, 0, 0.3)',
										},
									},
									selectedStyle: {
										backgroundColor:
											'rgba(105, 211, 205, 0.05)',
										border: {
											color: ' rgba(0, 0, 0, 0.3)',
										},
									},
									progressBar: {
										font: {color: '#44c8c0'},
									},
								},
							},
							edit: {
								font: {
									color: 'rgba(255, 255, 255, 0.87)',
								},
								backgroundColor: '#1b2935',
								textAreass: {
									font: {
										color: 'rgba(255, 255, 255, 0.87)',
									},
									backgroundColor: '#121d28',
								},
							},
						},
					},
				},

				setting: {
					header: {
						backgroundColor: '#1e364c',
						border: {
							color: 'rgba(0, 0, 0, 0.3)',
						},
					},

					navigation: {
						font: {color: 'rgba(255,255,255,0.87)'},
						backgroundColor: '#1e364c',
						border: {
							color: 'rgba(0, 0, 0, 0.3)',
						},
						items: {
							normalStyle: {
								backgroundColor: '#1e364c',
								border: {color: '#1e364c'},
							},
							selectedStyle: {
								backgroundColor: 'rgba(0,0,0,0.22)',
								border: {color: '#44c8c0'},
							},
						},
					},

					content: {
						normalStyle: {
							font: {color: 'rgba(255,255,255,0.87)'},
							backgroundColor: '#1b2935',
							title: {
								border: {
									color: 'rgba(0,0,0,0.3)',
								},
							},
						},
						identitiesPageStyle: {
							items: {
								normalStyle: {
									backgroundColor: '#21303e',
									border: {
										color: 'rgba(0,0,0,0.3)',
									},
									resourceTableSelectedStyle: {
										backgroundColor: 'rgba(0,0,0,0.12)',
									},
									accountTableSelectedStyle: {
										backgroundColor:
											'rgba(105,211,205,0.05)',
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
						color: 'rgba(255, 255, 255, 0.87)',
					},
					backgroundColor: '#18191f',
					iconButtons: {
						font: {
							color: 'rgba(255, 255, 255, 0.6)',
						},
						hover: {
							font: {
								color: 'rgba(255, 255, 255, 0.87)',
							},
						},
					},
				},
			},
		},

		basic: {
			default: {
				font: {color: 'rgba(255, 255, 255, 0.87)'},
				border: {color: 'rgba(0, 0, 0, 0.3)'},
			},

			pages: {
				buttons: {
					normalStyle: {
						normalStyle: {
							font: {color: '#212121'},
							backgroundColor: '#44c8c0',
							hover: {backgroundColor: '#69d3cd'},
							active: {backgroundColor: '#31bbb3'},
						},
						warningStyle: {
							font: {color: '#212121'},
							backgroundColor: '#de6565',
							hover: {backgroundColor: '#e27777'},
							active: {backgroundColor: '#d45959'},
						},
						transparentStyle: {
							font: {
								color: 'rgba(255, 255, 255, 0.6)',
							},
							border: {
								color: 'rgba(255, 255, 255, 0.38)',
							},
							hover: {
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
								border: {
									color: 'rgba(255, 255, 255, 0.38)',
								},
							},
							active: {
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
								border: {
									color: 'rgba(255, 255, 255, 0.38)',
								},
							},
						},
						disabledStyle: {
							font: {
								color: 'rgba(255, 255, 255, 0.38)',
							},
							backgroundColor: 'rgba(255, 255, 255, 0.12)',
						},
					},
					borderStyle: {
						normalStyle: {
							font: {color: '#44c8c0'},
							border: {color: '#44c8c0'},
							hover: {
								font: {color: '#69d3cd'},
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
								border: {color: '#69d3cd'},
							},
							active: {
								font: {color: '#31bbb3'},
								backgroundColor: 'rgba(255, 255, 255, 0.12)',
								border: {color: '#31bbb3'},
							},
						},
						warningStyle: {
							font: {color: '#d45959'},
							border: {color: '#d45959'},
							hover: {
								font: {color: '#de6565'},
								backgroundColor: 'rgba(226, 120, 120, 0.04)',
								border: {color: '#de6565'},
							},
							active: {
								font: {color: '#b84646'},
								backgroundColor: 'rgba(212, 89, 89, 0.12)',
								border: {color: 'b84646'},
							},
						},
						transparentStyle: {
							font: {
								color: 'rgba(255, 255, 255, 0.6)',
							},
							hover: {
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
							},
							active: {
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
							},
						},
						disabledStyle: {
							font: {
								color: 'rgba(255, 255, 255, 0.38)',
							},
							backgroundColor: 'transparent',
							border: {
								color: 'rgba(255, 255, 255, 0.12)',
							},
						},
						transparentDisabledStyle: {
							font: {
								color: 'rgba(255, 255, 255, 0.38)',
							},
							backgroundColor: 'transparent',
						},
					},
				},

				checkBoxs: {
					normalStyle: {
						check: {
							font: {color: '#44c8c0'},
						},
						default: {
							font: {color: 'rgba(255, 255, 255, 0.6)'},
						},
					},
				},
				contextMenus: {
					normalStyle: {
						backgroundColor: '#253545',
						font: {color: 'rgba(255, 255, 255, 0.87)'},
						border: {color: 'rgba(0, 0, 0, 0.3)'},
						selected: {
							backgroundColor: 'rgba(0, 0, 0, 0.12)',
						},
					},
				},
				dialogBoxs: {
					normalStyle: {
						font: {color: 'rgba(255, 255, 255, 0.87)'},
						backgroundColor: '#223b52',
						border: {color: 'rgba(0, 0, 0, 0.3)'},
						boxShadow: {
							color: 'rgba(0, 0, 0, 0.22)',
						},
						subBlock: {
							backgroundColor: '#1e364c',
							selected: {
								backgroundColor: 'rgba(0, 0, 0, 0.22)',
								border: {color: '#44c8c0'},
							},
						},
					},
				},
				panels: {
					normalStyle: {
						font: {color: ''},
						backgroundColor: '',
						border: {color: ''},
					},
				},
				icons: {
					dynamicIcons: {
						normal: {
							normalStyle: {
								font: {
									color: 'rgba(255, 255, 255, 0.6)',
								},
							},
							confirmStyle: {
								font: {color: '#44c8c0'},
							},
							warningStyle: {
								font: {color: '#de6565'},
							},
							fontColorStyle: {
								font: {
									color: 'rgba(255, 255, 255, 0.87)',
								},
							},
						},
						hover: {
							font: {
								color: 'rgba(255, 255, 255, 0.87)',
							},
						},
						selected: {font: {color: '#44c8c0'}},
					},
					imageIcons: {},
				},
				textBoxs: {
					normalStyle: {
						font: {color: 'rgba(255, 255, 255, 0.87)'},
						backgroundColor: 'rgba(0, 0, 0, 0.22)',
						border: {color: 'none'},
						focused: {border: {color: '#44c8c0'}},
						invalid: {
							border: {
								color: '#de6565',
							},
						},
					},

					searchStyle: {
						font: {color: 'rgba(255, 255, 255, 0.87)'},
						backgroundColor: 'rgba(0, 0, 0, 0.22)',
						border: {
							color: 'none',
						},
					},
				},
				textAreass: {
					normalStyle: {
						font: {color: 'rgba(255, 255, 255, 0.87)'},
						backgroundColor: 'rgba(0, 0, 0, 0.22)',
						border: {color: 'none'},
						focused: {border: {color: '#44c8c0'}},
					},

					dialogBoxStyle: {
						font: {color: 'rgba(255, 255, 255, 0.87)'},
						backgroundColor: 'rgba(0, 0, 0, 0.22)',
						border: {color: 'none'},
						focused: {border: {color: ''}},
					},
				},
				radios: {
					normalStyle: {
						check: {
							font: {color: '#44c8c0'},
						},
						default: {font: {color: 'rgba(255, 255, 255, 0.6)'}},
					},
				},
				comboBoxs: {
					control: {
						font: {
							color: 'rgba(255, 255, 255, 0.87)',
						},
						border: {color: 'none'},
						backgroundColor: 'rgba(0, 0, 0, 0.22)',
						focused: {border: {color: '#4ca6a8'}},
					},

					menuList: {
						backgroundColor: {
							normalStyle: '#253545',
							dialogStyle: '#2f4b60',
						},
					},

					options: {
						font: {
							color: 'rgba(255, 255, 255, 0.87)',
						},
						backgroundColor: {
							normalStyle: '#253545',
							dialogStyle: '#2f4b60',
						},
						disabled: {
							backgroundColor: null,
						},
						selected: {
							backgroundColor: 'rgba(0, 0, 0, 0.12)',
						},
						focused: {
							backgroundColor: 'rgba(0, 0, 0, 0.12)',
						},
					},
				},
			},
		},
	},
};
