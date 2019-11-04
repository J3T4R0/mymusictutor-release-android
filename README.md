# mymusictutor-release-android
android release


To download: 
  A) Download zip file and unzip it.
  
  B) Download git. then use git clone mymusictutor-release-android
  
To run: 
  A) Use Android Studio
  
  B) Use Expo 
  
  A: after downloading android studio, hit the simulate button.
  B: use expo build:android in command line after installing with npm i expo && npm i  && npm
  
  
  For clj build, please install lein (leningen):
  
     You can save some time (that is spent by lein-droid running adb devices) by providing special flags to the task. For example, if there is only one physical device connected you can call the tasks in this way: lein droid deploy -d or for the only emulator: lein droid deploy -e. You can even directly specify the device in the command by its serial number:

For example: lein droid deploy -s I29751849af4

lein with-profile release do droid build, droid apk, droid deploy
Debug versions are automatically signed with debug.keystore which has a standard password and parameters. For the release version that can be published in Play Market you need to create a personalized keystore. If you just want to test how your application works in release mode, put :use-debug-keystore true in the :android map of the :release profile.

You can read a detailed information on what is a keystore and why signing your applications is necessary here.

To create a personal keystore execute this:

keytool -genkeypair -keyalg RSA -keystore "/path/to/keystore/file" -alias "the_alias_for_you_key" -validity 36500
The last parameter -validity specifies in days for how long should the key be valid. In the example we set it to be 100 years.

After you execute the command you will be asked a few more questions, and then a keystore will be generated.

Libraries and dependencies
You can specify common Java and Clojure dependencies the same way you do in Clojure/JVM projects, by adding them to :dependencies vector. Android libraries that contain resources have a special format — AAR — which is slightly different from JAR. You can specify them in the same way as regular JAR dependencies, by adding them to :dependencies vector and mentioning aar extension. For example:

[com.github.gabrielemariotti.cards/library "1.9.1" :extension "aar"]
Support libraries
Lein-droid automatically makes available the local repository with Android Support libraries. You can simply add the required dependency to the list. Example:

[com.android.support/appcompat-v7 "18.0.0" :extension "aar"]
[com.android.support/support-v4 "18.0.0"]
There are various support libraries (like v4, v3, several v7’s) that serve different purposes. The version of the dependency (in this case 18.0.0) should usually match the :target-version. You can discover which support libraries are available, and what their versions are by browsing <sdk-path>/extras/android/m2repository directory on your disk.

Google Play Services
This set of libraries provides access to various Android APIs. Same as with support libraries, the necessary repository is already included. The following line will pull all Play Services modules into your app:

[com.google.android.gms/play-services "7.0.0" :extension "aar"]
Usually you won’t be needing all of those, so you should rather specify concrete modules like play-services-analytics. List of all modules and their versions can be found in <sdk-path>/extras/google/m2repository.
  
Installation
Lein-droid is a plugin for Leiningen, so you should make sure you have Leiningen 2.3 or higher installed. This is all installation you have to do. When you create a new project with lein new droid <project-name> <package-name> [optional-args], the template will be downloaded automatically, and inside the project folder lein-droid will be already available.

Setting the path to Android SDK
Android SDK is obtainable from here. Download the archive for your operating system, unpack it somewhere, and run <sdk-path>/tools/android binary. The Android SDK Manager will open. From there you can install different SDK parts you’ll need.

Lein-droid and Neko have the following requirements to Android SDK:

SDK version >=15 (Android 4.0.3 or higher)
Android Build Tools version >=20
Android Support Repository
You also must have exactly JDK 1.7. Neither 1.6, nor 1.8 are supported by Android as of now.

You can specify the path to the SDK either globally in profiles.clj in :android-common profile, or on the per-project basis (in project.clj). Either way, you should put :sdk-path value into :android map:

:android {:sdk-path "/path/to/android-sdk-linux_x86"}
Related options: :sdk-path, :target-version.

Note to 64-bit Linux users
You might have problems with running Android SDK on a 64-bit system. On my Arch Setup it was enough for me to install lib32-ncurses from multilib repository. Here’s the guide how to deal with this on Fedora (thanks to Przemysław Wojnowski for this).

Setting up CIDER
If you use CIDER, and want to enable its additional features in your Clojure-Android application, put the following profile into your profiles.clj file.

:android-user {:dependencies [[cider/cider-nrepl "0.9.1"]]
               :android {:aot-exclude-ns ["cider.nrepl.middleware.util.java.parser"
                                          "cider.nrepl" "cider-nrepl.plugin"]}}
Notice that you have to add cider-nrepl dependency even if already have it in your :user profile. This is because Clojure-Android applications do not merge :user profile as described here.

Creating a new project
To create a new Android project execute the following command:

lein new droid <project-name> <package-name> [optional-args]
The order is important: new comes before droid. lein droid new is also a correct command, but it requires lein-droid to be already present on the classpath, so you won’t be able to use it outside existing Clojure-Android project.

project-name is the name of the new Clojure project. By default it also acts as an Android application name but you can specify a custom application name in the optional arguments.

package-name represents an Android package name by which all applications are distinguished. Package name should have at least two levels (like foo.bar) and not contain any hyphens (underscores can be used instead).

Optional arguments:

:activity — name of the main Activity class in the application.
:target-sdk — version of Android you want to compile the app against.
:min-sdk — minimal Android version your app still supports.
:app-name — name of the application as seen in the App Drawer.
For example:

lein new droid superapp my.company.superapp :activity MyActivity :target-sdk 15 :app-name SuperApp
You can change these options later by editing project.clj and source files.

Initial configuration
When a new project is created, project.clj is generated almost ready to be used. The only thing you have to change is to specify the path to your Android SDK (if you haven’t already done it in profiles.clj).

For the full list of supported options see this file.

Quick start
To compile, build and deploy with one command use:

lein droid doall
This is the command to go from source code to the application running on your device with the REPL ready. You’ll use it most of the time when a fine-grained build process is not necessary. In case it is, next paragraphs describe the build process step-by-step.

Compilation/building
In order to compile/build your project execute the following:

lein droid build
This creates R.java file from the resources, compiles the Java files (if available), and all the Clojure files including all dependencies. This takes a while for the first time, but subsequent compilations will be much faster.

After the compilation a DEX file is created. This is also a quite time-consuming operation, it fully loads CPU and may last for about a minute. The good thing is that you won’t have to do it often since you’ll have a REPL available.

DEXing step may fail if you hit a 65k method limit that Android tooling imposes on DEX files. This usually happens when you add big dependencies to your project. If you see an error that somehow refers to 65 thousand methods, you need to enable multi-dex build of your project. See this page for details.
  
  
