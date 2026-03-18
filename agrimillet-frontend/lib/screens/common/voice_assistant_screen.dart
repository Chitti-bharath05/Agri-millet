import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';

class VoiceAssistantScreen extends StatefulWidget {
  const VoiceAssistantScreen({Key? key}) : super(key: key);

  @override
  State<VoiceAssistantScreen> createState() => _VoiceAssistantScreenState();
}

class _VoiceAssistantScreenState extends State<VoiceAssistantScreen> {
  final FlutterTts _flutterTts = FlutterTts();
  
  String _selectedLanguage = 'en';
  bool _isPlaying = false;
  String _assistantMessage = 'Hello! I\'m your AgriMillet assistant. How can I help you today?';

  final Map<String, String> _languageNames = {
    'en': 'English',
    'hi': 'हिंदी',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'kn': 'ಕನ್ನಡ',
    'mr': 'मराठी',
    'gu': 'ગુજરાતી',
  };

  final Map<String, Map<String, String>> _responses = {
    'en': {
      'hi': 'Hello! I\'m your AgriMillet assistant.',
      'help': 'I can help you with crop prices, farming tips, market information, and payment assistance.',
      'prices': 'You can check government-fixed prices for different millet types in the crop details section.',
      'crops': 'You can upload crops by clicking the upload button on your home screen.',
      'payment': 'Payments are processed securely through Razorpay. Your money goes directly to farmer accounts.',
      'delivery': 'Farmers provide GPS-tracked delivery. You can track your order in real-time.',
    },
    'hi': {
      'hi': 'नमस्ते! मैं आपका एग्रीमिलेट सहायक हूँ।',
      'help': 'मैं आपको फसल की कीमतें, खेती की सुझावें, बाजार की जानकारी देने में मदद कर सकता हूँ।',
      'prices': 'आप फसल विवरण अनुभाग में विभिन्न बाजरा प्रकारों के लिए सरकार द्वारा निर्धारित कीमतें देख सकते हैं।',
      'crops': 'आप अपनी होम स्क्रीन पर अपलोड बटन पर क्लिक करके फसलें अपलोड कर सकते हैं।',
      'payment': 'भुगतान Razorpay के माध्यम से सुरक्षित रूप से संसाधित होता है।',
      'delivery': 'किसान जीपीएस-ट्रैक की गई डिलीवरी प्रदान करते हैं।',
    },
    'ta': {
      'hi': 'வணக்கம்! நான் உங்கள் AgriMillet உதவியாளர்.',
      'help': 'விளைபொருட்களின் விலை, விவசாய குறிப்புகள், சந்தை தகவல் ஆகியவற்றில் நான் உங்களுக்கு உதவ முடியும்.',
      'prices': 'விளைபொருளின் விவரங்கள் பிரிவில் பல்வேறு கேழ்வரகு வகைகளுக்கான அரசு நির்ধारிত விலைகளை பார்க்கலாம்.',
      'crops': 'உங்கள் முகப்பு திரையில் பதிவேற்ற பொத்தானைக் கிளிக் செய்து பயிர்களை பதிவேற்றலாம்.',
      'payment': 'Razorpay மூலம் பாதுகாப்பாக பணம் செலுத்தப்படுகிறது.',
      'delivery': 'விவசாயிகள் GPS-ல் பயணம் செய்யும் டெலிவரி வழங்குகின்றனர்.',
    },
  };

  @override
  void initState() {
    super.initState();
    _initTts();
    _speak(_assistantMessage);
  }

  Future<void> _initTts() async {
    await _flutterTts.setLanguage('en-US');
    await _flutterTts.setSpeechRate(0.5);
    
    _flutterTts.setCompletionHandler(() {
      setState(() => _isPlaying = false);
    });
  }

  Future<void> _speak(String text) async {
    setState(() => _isPlaying = true);
    
    final locale = _selectedLanguage == 'hi' ? 'hi-IN' :
                   _selectedLanguage == 'ta' ? 'ta-IN' :
                   _selectedLanguage == 'te' ? 'te-IN' :
                   _selectedLanguage == 'kn' ? 'kn-IN' :
                   _selectedLanguage == 'mr' ? 'mr-IN' :
                   _selectedLanguage == 'gu' ? 'gu-IN' :
                   'en-US';
    
    await _flutterTts.setLanguage(locale);
    await _flutterTts.speak(text);
  }

  Future<void> _stopSpeaking() async {
    await _flutterTts.stop();
    setState(() => _isPlaying = false);
  }

  void _selectTopic(String topic) {
    final message = _responses[_selectedLanguage]?[topic] ??
        _responses['en']?[topic] ??
        'Information not available';
    
    setState(() => _assistantMessage = message);
    _speak(message);
  }

  @override
  void dispose() {
    _flutterTts.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Voice Assistant'),
        backgroundColor: const Color(0xFF2E7D32),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Assistant Avatar
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(32),
              decoration: const BoxDecoration(
                color: Color(0xFF2E7D32),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(24),
                  bottomRight: Radius.circular(24),
                ),
              ),
              child: Column(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white.withOpacity(0.2),
                    ),
                    child: Icon(
                      _isPlaying ? Icons.mic : Icons.smart_toy,
                      size: 50,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'AgriMillet Assistant',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _isPlaying ? 'Speaking...' : 'Ready to help',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.white.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
            ),

            // Message Display
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE0E0E0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Assistant Message',
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFF999999),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _assistantMessage,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color(0xFF333333),
                      height: 1.6,
                    ),
                  ),
                ],
              ),
            ),

            // Language Selector
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Language',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF333333),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      border: Border.all(color: const Color(0xFFDDDDDD)),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: DropdownButton<String>(
                      value: _selectedLanguage,
                      isExpanded: true,
                      underline: const SizedBox(),
                      items: _languageNames.entries.map((entry) {
                        return DropdownMenuItem(
                          value: entry.key,
                          child: Text(entry.value),
                        );
                      }).toList(),
                      onChanged: (value) {
                        if (value != null) {
                          setState(() => _selectedLanguage = value);
                          _selectTopic('hi');
                        }
                      },
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Control Buttons
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        onPressed: _isPlaying ? _stopSpeaking : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          disabledBackgroundColor: Colors.grey[300],
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.stop, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              _isPlaying ? 'Stop' : 'Playing',
                              style: const TextStyle(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        onPressed: () => _speak(_assistantMessage),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF2E7D32),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.volume_up, size: 20),
                            SizedBox(width: 8),
                            Text(
                              'Replay',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Quick Topics
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Quick Topics',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF333333),
                    ),
                  ),
                  const SizedBox(height: 12),
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    childAspectRatio: 2.5,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    children: [
                      _buildTopicButton('💰 Prices', 'prices'),
                      _buildTopicButton('🌾 Crops', 'crops'),
                      _buildTopicButton('💳 Payment', 'payment'),
                      _buildTopicButton('🚚 Delivery', 'delivery'),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildTopicButton(String label, String topic) {
    return ElevatedButton(
      onPressed: () => _selectTopic(topic),
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFF0F7ED),
        elevation: 0,
        side: const BorderSide(color: Color(0xFFDCEDD6)),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: Color(0xFF2E7D32),
        ),
      ),
    );
  }
}
