module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      uglify: {
        options: {
          // the banner is inserted at the top of the output
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: [{
            'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }]
        }
      },

			compass: {
				dist: {
					options: {
						sassDir: 'src/sass',
						cssDir: 'src/css'
					}
				}
			},
      
			jshint: {
        // define the files to lint
        ignores: ['gruntfile.js', 'src/js/libs/**/*.js', 'specs/**/*.js'],
        files: ['gruntfile.js', 'src/js/**/*.js', 'specs/**/*.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
            // more options here if you want to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      }, 

      watch: {
        devjs : {
          files: [
            'src/js/model/**/*.js',
            'src/js/reactiveSources/**/*.js',
            'src/js/viewmodel/**/*.js',
            'src/js/*.js',
            'specs/**/*.js'],
          tasks: ['devjs']
        },
        devjsUI : {
          files: [
            'src/js/ui/**/*.js'
          ],
          tasks: ['devjsUI']
        },
        devhtml: {
          files: ['src/html/**/*'],
          tasks: ['devhtml']
        },
        devcss: {
          files: ['src/css/**/*'],
          tasks: ['devcss']
        },
        devimages: {
          files: ['src/images/**/*'],
          tasks: ['devimages']
        },
        devfonts: {
          files: ['src/fonts/**/*'],
          tasks: ['devfonts']
        },
        wwwroot : {
          files: ['www-root/**/*'],
          options : {
            // livereload :1337
          }
        },
				compass: {
					files: [
						'src/sass/**/*.scss'
					],
					tasks: ['compass']
				},
      },

      clean : {
        devhtml : ['www-root/*.html'],
        devjs : ['www-root/js/yolo-bear.js'],
        devcss : ['www-root/css/*.*'],
        devimages : ['www-root/images/*.*'],
        devfonts : ['www-root/fonts/*.*'],
        massive : ['dist/*.*'],

       	options : { force: true }
      },

      copy: {
      	devjs: {
	        files: [
	          // includes files within path and its sub-directories
            {expand: true, cwd:'src/libs/js', src: ['*.*'], dest: 'www-root/js'},
            {expand: true, cwd:'src/libs/socket.io-1.1.0', src: ['*.*'], dest: 'www-root/socket.io'},

            {expand: true, cwd:'src/libs/js', src: ['*.*'], dest: 'dist/js'},
            {expand: true, cwd:'src/libs/socket.io-1.1.0', src: ['*.*'], dest: 'dist/socket.io'}
	        ]
	     },
       devhtml: {
          files: [
            // includes files within path and its sub-directories
            {expand: true, cwd:'src/html/', src: ['**'], dest: 'www-root'},
            {expand: true, cwd:'src/img/', src: ['*.*'], dest: 'www-root/img'},

            {expand: true, cwd:'src/html/', src: ['**'], dest: 'dist'},
            {expand: true, cwd:'src/img/', src: ['*.*'], dest: 'dist/img'}
          ]
       },
       devcss: {
          files: [
            // includes files within path and its sub-directories
            {expand: true, cwd:'src/css/', src: ['*.*'], dest: 'www-root/css'},
            {expand: true, cwd:'src/css/', src: ['*.*'], dest: 'dist/css'}
          ]
       },
       devimages: {
          files: [
            // includes files within path and its sub-directories
            {expand: true, cwd:'src/images/', src: ['*.*'], dest: 'www-root/images'},
            {expand: true, cwd:'src/images/', src: ['*.*'], dest: 'dist/images'}
          ]
       },
       devfonts: {
          files: [
            // includes files within path and its sub-directories
            {expand: true, cwd:'src/fonts/', src: ['*.*'], dest: 'www-root/fonts'},
            {expand: true, cwd:'src/fonts/', src: ['*.*'], dest: 'dist/fonts'}
          ]
       },
      },
      simplemocha: {
          options: {
              globals: ['expect'],
              timeout: 500,
              ignoreLeaks: false,
              ui: 'bdd',
              reporter: 'nyan'
          },
          all: { src: ['specs/unitTests/*.js'] }
      },

      browserify: {
          yolo : { 
            files : {
              'www-root/js/app.js' :['src/js/yoloBear.js']
            },
            options : {
              watch : true
            }  
          },
          massive : { 
            files : {
              'dist/js/app.js' :['src/js/massiveBear.js']
            },
            options : {
              watch : true
            }  
          }
        },

      connect: {
        all: {
          options: {
            port: 9001,
            base: 'www-root',
            // livereload: true
          }
        }
      },
      parallel : {
        web : {
          options:{
            stream:true
          },
          tasks : [ {
            grunt:true,
            args : ['watch:devjs']
            },
            {
            grunt:true,
            args : ['watch:devjsUI']
            },
            {
            grunt:true,
            args : ['watch:devhtml']
            },
						{
						grunt: true,
						args: ['watch:compass']
						}, 
            {
            grunt:true,
            args : ['watch:devcss']
            }, 
						{
            grunt:true,
            args : ['watch:devimages']
            },
						{
            grunt:true,
            args : ['watch:devfonts']
            },
            {
            grunt:true,
            args : ['watch:wwwroot']
            }
          ]
        }
      }

    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-parallel'); 
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
		grunt.loadNpmTasks('grunt-contrib-compass');
    
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'simplemocha', 'clean', 'browserify','compass', 'copy', "connect", 'parallel:web']);
    

    grunt.registerTask('devjs', ['jshint', 'simplemocha', 'clean:devjs','browserify']);
    grunt.registerTask('devjsUI', ['jshint', 'clean:devjs','browserify']);
    grunt.registerTask('devhtml', ['clean:devhtml', 'copy:devhtml']);
    grunt.registerTask('devcss', ['clean:devcss','copy:devcss']);
    grunt.registerTask('devimages', ['clean:devimages','copy:devimages']);
    grunt.registerTask('devfonts', ['clean:devfonts','copy:devfonts']);

		grunt.registerTask('travis', ['jshint','simplemocha']);
   
};

